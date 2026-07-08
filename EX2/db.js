import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'attendance.sqlite'),
  logging: false,
});