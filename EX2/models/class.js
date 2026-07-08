import { DataTypes, Model } from 'sequelize';

export class Class extends Model {
  static associate(models) {
    this.hasMany(models.AttendanceRecord, {
      foreignKey: 'classId',
      as: 'attendanceRecords',
    });
  }
}

export function initClass(sequelize) {
  Class.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      room: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Class',
    }
  );

  return Class;
}