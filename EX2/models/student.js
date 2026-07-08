import { DataTypes, Model } from 'sequelize';

export class Student extends Model {
  static associate(models) {
    this.hasMany(models.AttendanceRecord, {
      foreignKey: 'studentId',
      as: 'attendanceRecords',
    });
  }
}

export function initStudent(sequelize) {
  Student.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Student',
    }
  );

  return Student;
}