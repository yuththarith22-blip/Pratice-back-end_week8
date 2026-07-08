import { app } from './app.js';
import { AttendanceRecord, Class, Student, sequelize } from './models/index.js';

async function seedDatabase() {
  await sequelize.sync({ force: true });

  const [math, science] = await Promise.all([
    Class.create({ name: 'Mathematics', code: 'MATH101', room: 'A1' }),
    Class.create({ name: 'Science', code: 'SCI201', room: 'B2' }),
  ]);

  const [alice, bob, carla] = await Promise.all([
    Student.create({ firstName: 'Alice', lastName: 'Ng', studentNumber: 'S001' }),
    Student.create({ firstName: 'Bob', lastName: 'Tan', studentNumber: 'S002' }),
    Student.create({ firstName: 'Carla', lastName: 'Lim', studentNumber: 'S003' }),
  ]);

  await AttendanceRecord.bulkCreate([
    {
      studentId: alice.id,
      classId: math.id,
      attendanceDate: '2025-06-17',
      status: 'present',
    },
    {
      studentId: bob.id,
      classId: math.id,
      attendanceDate: '2025-06-17',
      status: 'late',
    },
    {
      studentId: carla.id,
      classId: science.id,
      attendanceDate: '2025-06-17',
      status: 'absent',
    },
    {
      studentId: alice.id,
      classId: science.id,
      attendanceDate: '2025-06-18',
      status: 'present',
    },
  ]);
}

async function startServer() {
  await seedDatabase();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Attendance API running on http://localhost:${port}`);
  });
}

startServer().catch(async (error) => {
  console.error(error);
  await sequelize.close();
  process.exitCode = 1;
});