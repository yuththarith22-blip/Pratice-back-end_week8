import { DataTypes, Model } from 'sequelize';

export class Book extends Model {
  static associate(models) {
    this.belongsTo(models.Author, {
      foreignKey: 'authorId',
      as: 'author',
    });
  }
}

export function initBook(sequelize) {
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );

  return Book;
}
