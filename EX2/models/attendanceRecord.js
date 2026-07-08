import { DataTypes, Model } from 'sequelize';

export class AttendanceRecord extends Model {
  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student',
    });

    this.belongsTo(models.Class, {
      foreignKey: 'classId',
      as: 'class',
    });
  }
}

export function initAttendanceRecord(sequelize) {
  AttendanceRecord.init(
    {
      attendanceDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('present', 'absent', 'late'),
        allowNull: false,
        defaultValue: 'present',
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'AttendanceRecord',
      indexes: [
        {
          unique: true,
          fields: ['studentId', 'classId', 'attendanceDate'],
        },
      ],
    }
  );

  return AttendanceRecord;
}