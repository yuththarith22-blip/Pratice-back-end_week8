import { sequelize } from '../db.js';
import { Author, initAuthor } from './author.js';
import { Book, initBook } from './book.js';

initAuthor(sequelize);
initBook(sequelize);

Author.associate({ Book });
Book.associate({ Author });

export { sequelize, Author, Book };
