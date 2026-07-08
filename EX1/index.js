import { sequelize, Author, Book } from './models/index.js';

async function seedDatabase() {
  await sequelize.sync({ force: true });

  const authors = await Promise.all([
    Author.create({ name: 'Ronan The Best', birthYear: 1990 }),
    Author.create({ name: 'Kim Ang', birthYear: 1995 }),
    Author.create({ name: 'Hok Tim', birthYear: 2015 }),
  ]);

  await authors[0].createBook({
    title: 'The Ronan Rise',
    publicationYear: 2010,
    pages: 280,
  });
  await authors[0].createBook({
    title: 'Best Practices Forever',
    publicationYear: 2016,
    pages: 340,
  });

  await authors[1].createBook({
    title: 'Kim and the Cloud',
    publicationYear: 2018,
    pages: 220,
  });
  await authors[1].createBook({
    title: 'Ang in Action',
    publicationYear: 2021,
    pages: 310,
  });

  await authors[2].createBook({
    title: 'Hok Tim Learns Sequelize',
    publicationYear: 2024,
    pages: 120,
  });
  await authors[2].createBook({
    title: 'Tiny Steps, Big Code',
    publicationYear: 2025,
    pages: 180,
  });

  const givenAuthor = await Author.findOne({
    where: { name: 'Ronan The Best' },
  });

  const ronanBooks = await givenAuthor.getBooks();
  console.log('\nBooks by Ronan The Best:');
  console.log(JSON.stringify(ronanBooks, null, 2));

  const newBook = await givenAuthor.createBook({
    title: 'Ronan Writes Again',
    publicationYear: 2026,
    pages: 260,
  });
  console.log('\nNew book created with createBook():');
  console.log(JSON.stringify(newBook, null, 2));

  const authorsWithBooks = await Author.findAll({
    include: {
      model: Book,
      as: 'books',
    },
    order: [
      ['name', 'ASC'],
      [{ model: Book, as: 'books' }, 'publicationYear', 'ASC'],
    ],
  });

  console.log('\nAuthors with their books:');
  console.log(JSON.stringify(authorsWithBooks, null, 2));
}

seedDatabase()
  .then(async () => {
    await sequelize.close();
  })
  .catch(async (error) => {
    console.error(error);
    await sequelize.close();
    process.exitCode = 1;
  });
