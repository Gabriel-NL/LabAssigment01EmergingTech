const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Course = require("../models/Course");

async function addStudent(req, res) {
  const {
    studentNumber,
    password,
    firstName,
    lastName,
    address,
    city,
    phone,
    email,
    program,
    favoriteTopic,
    strongestSkill
  } = req.body;

  if (!studentNumber || !password || !firstName || !lastName || !email) {
    return res.status(400).json({ message: "Missing required student fields" });
  }

  const exists = await Student.findOne({ studentNumber: String(studentNumber).trim() });
  if (exists) return res.status(409).json({ message: "Student number already exists" });

  const passwordHash = await bcrypt.hash(password, 10);

  const s = await Student.create({
    studentNumber: String(studentNumber).trim(),
    passwordHash,
    firstName,
    lastName,
    address: address || "",
    city: city || "",
    phone: phone || "",
    email,
    program: program || "",
    favoriteTopic: favoriteTopic || "",
    strongestSkill: strongestSkill || "",
    role: "student"
  });

  return res.status(201).json({ user: s.safe() });
}

async function listStudents(req, res) {
  const students = await Student.find({ role: "student" }).sort({ createdAt: -1 });
  return res.json(students.map((s) => s.safe()));
}

async function listCourses(req, res) {
  const courses = await Course.find({}).sort({ createdAt: -1 }).lean();
  return res.json(
    courses.map((c) => ({
      _id: c._id,
      courseCode: c.courseCode,
      courseName: c.courseName,
      section: c.section,
      semester: c.semester
    }))
  );
}

async function listStudentsInCourse(req, res) {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate("students", "studentNumber firstName lastName email program role");
  if (!course) return res.status(404).json({ message: "Course not found" });

  const roster = (course.students || [])
    .filter((s) => String(s.role).toLowerCase() === "student")
    .map((s) => ({
      _id: s._id,
      studentNumber: s.studentNumber,
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
      program: s.program
    }));

  return res.json(roster);
}

module.exports = { addStudent, listStudents, listCourses, listStudentsInCourse };
