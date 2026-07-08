import express from 'express';
import {
  AttendanceRecord,
  Class,
  Student,
} from './models/index.js';

const app = express();

app.use(express.json());

function buildAttendanceSummary(records) {
  return records.reduce(
    (summary, record) => {
      summary.total += 1;
      summary[record.status] += 1;
      return summary;
    },
    { total: 0, present: 0, absent: 0, late: 0 }
  );
}

app.post('/attendance', async (req, res, next) => {
  try {
    const studentId = Number(req.query.studentId ?? req.body.studentId);
    const classId = Number(req.query.classId ?? req.body.classId);
    const attendanceDate = req.query.date ?? req.body.date;
    const status = req.body.status ?? 'present';
    const note = req.body.note ?? null;

    if (!studentId || !classId || !attendanceDate) {
      return res.status(400).json({
        message: 'studentId, classId, and date are required.',
      });
    }

    const [student, attendanceClass] = await Promise.all([
      Student.findByPk(studentId),
      Class.findByPk(classId),
    ]);

    if (!student || !attendanceClass) {
      return res.status(404).json({
        message: 'Student or class not found.',
      });
    }

    const [record, created] = await AttendanceRecord.findOrCreate({
      where: { studentId, classId, attendanceDate },
      defaults: { status, note },
    });

    if (!created) {
      await record.update({ status, note });
    }

    const savedRecord = await AttendanceRecord.findByPk(record.id, {
      include: [
        { model: Student, as: 'student' },
        { model: Class, as: 'class' },
      ],
    });

    return res.status(created ? 201 : 200).json({
      message: created ? 'Attendance marked.' : 'Attendance updated.',
      record: savedRecord,
    });
  } catch (error) {
    next(error);
  }
});

app.get('/attendance', async (req, res, next) => {
  try {
    const studentId = Number(req.query.studentId);
    const attendanceDate = req.query.date;
    const classId = req.query.classId ? Number(req.query.classId) : undefined;

    if (!studentId || !attendanceDate) {
      return res.status(400).json({
        message: 'studentId and date are required.',
      });
    }

    const where = { studentId, attendanceDate };

    if (classId) {
      where.classId = classId;
    }

    const records = await AttendanceRecord.findAll({
      where,
      include: [
        { model: Student, as: 'student' },
        { model: Class, as: 'class' },
      ],
      order: [
        ['attendanceDate', 'ASC'],
        ['classId', 'ASC'],
      ],
    });

    return res.json({ records });
  } catch (error) {
    next(error);
  }
});

app.get('/classes/:id/attendance', async (req, res, next) => {
  try {
    const classId = Number(req.params.id);

    const attendanceClass = await Class.findByPk(classId);

    if (!attendanceClass) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    const records = await AttendanceRecord.findAll({
      where: { classId },
      include: [{ model: Student, as: 'student' }],
      order: [
        ['attendanceDate', 'ASC'],
        ['studentId', 'ASC'],
      ],
    });

    return res.json({
      class: attendanceClass,
      records,
    });
  } catch (error) {
    next(error);
  }
});

app.get('/students/:id/attendance', async (req, res, next) => {
  try {
    const studentId = Number(req.params.id);

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const records = await AttendanceRecord.findAll({
      where: { studentId },
      include: [{ model: Class, as: 'class' }],
      order: [
        ['attendanceDate', 'ASC'],
        ['classId', 'ASC'],
      ],
    });

    return res.json({
      student,
      summary: buildAttendanceSummary(records),
      records,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json({
    message: 'Internal server error.',
  });
});

export { app, buildAttendanceSummary };