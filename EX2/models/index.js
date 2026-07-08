import { sequelize } from '../db.js';
import { Student, initStudent } from './student.js';
import { Class, initClass } from './class.js';
import {
  AttendanceRecord,
  initAttendanceRecord,
} from './attendanceRecord.js';

initStudent(sequelize);
initClass(sequelize);
initAttendanceRecord(sequelize);

Student.associate({ AttendanceRecord });
Class.associate({ AttendanceRecord });
AttendanceRecord.associate({ Student, Class });

export { sequelize, Student, Class, AttendanceRecord };