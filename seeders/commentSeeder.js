const { dbConnection } = require('../config/config');
const Comment = require('../models/Comment.js');
const Post = require('../models/post.js');
const User = require('../models/user.js');
const { faker } = require('@faker-js/faker');

const commentSeeder = async () => {
  try {
    await dbConnection();

    await Comment.deleteMany();

    const users = await User.find();

    if (!users.length) {
      console.error('❌ No hay usuarios en la base de datos.');
      process.exit(1);
    }

    const posts = await Post.find();
    if (!posts.length) {
      console.error('❌ No hay posts en la base de datos.');
      process.exit(1);
    }

    const commentsToInsert = [];

    for (let i = 0; i < 20; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomPost = posts[Math.floor(Math.random() * posts.length)];

      const randomText = faker.lorem.sentence();

      commentsToInsert.push({
        comment: randomText,
        post: randomPost._id,
        author: randomUser._id,
        likes: [],
        image: [],
      });
    }
    const insertedComments = await Comment.insertMany(commentsToInsert);

    console.log(`✅ Comentarios creados: ${insertedComments.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear el comentario: ', error);
    process.exit(1);
  }
};

commentSeeder();
