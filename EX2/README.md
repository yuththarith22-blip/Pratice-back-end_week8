# Exercise 3 - Attendance Tracker

## Q1 - Models

`Student`
- `firstName`
- `lastName`
- `studentNumber`

`Class`
- `name`
- `code`
- `room`

`AttendanceRecord`
- `attendanceDate`
- `status` (`present`, `absent`, `late`)
- `note`
- `studentId`
- `classId`

## Q2 - Relationships

- `Student.hasMany(AttendanceRecord)`
- `Class.hasMany(AttendanceRecord)`
- `AttendanceRecord.belongsTo(Student)`
- `AttendanceRecord.belongsTo(Class)`

`hasOne` is not required for this schema because each student and each class can have many attendance records.

## Q3 - Core Code Paths

- Mark attendance: create or update an `AttendanceRecord` for a student, class, and date.
- Get attendance for a student on a specific date: query records by `studentId` and `attendanceDate`.
- List attendance for all students in a class: query records by `classId` and include students.
- Get attendance summary for a student: count `present`, `absent`, and `late` records.

## Q4 - REST API

- `POST /attendance?studentId=1&classId=1&date=2025-06-17`
- `GET /attendance?studentId=1&date=2025-06-17`
- `GET /classes/:id/attendance`
- `GET /students/:id/attendance`

## Run

```bash
npm run start:ex2
```

The API uses SQLite and seeds sample data on startup.