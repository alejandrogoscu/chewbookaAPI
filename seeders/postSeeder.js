const { dbConnection } = require('../config/config');
const Post = require('../models/post.js');
const User = require('../models/user.js');
const { faker } = require('@faker-js/faker');

const images = [
  'https://lumiere-a.akamaihd.net/v1/images/screen_shot_2015-05-26_at_5_16a39e17.png',
  'https://lumiere-a.akamaihd.net/v1/images/databank_dathomirian_01_169_7cb460fd.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/ajan-kloss-main_1cbd44e9.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/pit-droids-main_8b5d6bda.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/porg-main_16933d3b.jpeg',
];

const randomImage = () => {
  return Math.random() < 0.5 // 50% de probabilidades de tener imagen
    ? images[Math.floor(Math.random() * images.length)]
    : null;
};

const postSeeders = async () => {
  try {
    await dbConnection();

    await Post.deleteMany();

    const users = await User.find();

    if (!users.length) {
      console.error('❌ No hay usuarios en la base de datos.');
      process.exit(1);
    }

    const posts = [];

    for (const user of users) {
      const numPosts = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numPosts; i++) {
        const post = {
          title: user.username + '',
          content: faker.lorem.paragraph(),
          author: user._id,
          comments: [],
          likes: [],
        };

        // 50% de probabilidad de tener imagen
        if (Math.random() < 0.4) {
          post.images = [images[Math.floor(Math.random() * images.length)]];
        }

        posts.push(post);
      }
    }

    const created = await Post.insertMany(posts);
    console.log(`✔ ${created.length} posts creados con éxito`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear los post: ', error);
    process.exit(1);
  }
};

postSeeders();
