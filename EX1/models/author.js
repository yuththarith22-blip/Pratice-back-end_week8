import { DataTypes, Model } from 'sequelize';

export class Author extends Model {
  static associate(models) {
    this.hasMany(models.Book, {
      foreignKey: 'authorId',
      as: 'books',
    });
  }
}

export function initAuthor(sequelize) {
  Author.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Author',
    }
  );

  return Author;
}
