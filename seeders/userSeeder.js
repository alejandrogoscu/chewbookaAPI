const { dbConnection } = require('../config/config');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const seedUsers = async () => {
  try {
    await dbConnection();
    await User.deleteMany();

    const usernames = [
      'DarthMeow',
      'YodaPaws',
      'ChewBaccaCat',
      'LeiaWhiskers',
      'VaderSnout',
      'R2Meow2',
      'ObiWanCatnobi',
      'PadmePurrr',
      'LukeFurwalker',
      'GroguFluff',
    ];

    const bios = [
      'Caminando por el Lado Oscuro con una bola de estambre.',
      'La fuerza es intensa en mis zarpas.',
      'Wookie de corazón, ronroneo de profesión.',
      'Princesa con garra y actitud rebelde.',
      'Más que respiraciones fuertes... soy ternura galáctica.',
      'Beep boop purr... soy más que un droide adorable.',
      'He entrenado en el arte Jedi y el arte del descanso.',
      'Diplomática, elegante y amante de los mimos.',
      'Cazando estrellas y juguetes desde Tatooine.',
      'Un padawan peludo con hambre de aventuras.',
    ];

    const images = [
      'https://imgur.com/blsTdRZ',
      'https://imgur.com/HEDlSDW',
      'https://imgur.com/RfYWVly',
      'https://imgur.com/NRY0cfr',
      'https://imgur.com/6TpaAwp',
      'https://imgur.com/MgeJHC9',
    ];

    const users = await Promise.all(
      usernames.map(async (username, index) => ({
        username: username,
        email: `${username.toLowerCase()}@galaxy.com`,
        password: await bcrypt.hash('123', 10),
        confirmed: true,
        image: images[Math.floor(Math.random() * images.length)],
        bio: bios[index],
      }))
    );

    const created = await User.insertMany(users);
    console.log('Usuarios creados con éxito:');
    created.forEach((u) => console.log(`✔ ${u.username} (${u.email})`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear usuarios:', error);
    process.exit(1);
  }
};

seedUsers();
