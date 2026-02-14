const Course = require("../models/Course");

async function listMyCourses(req, res) {
  const courses = await Course.find({ students: req.user._id }).lean();
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

async function enrollCourse(req, res) {
  const { courseId, section } = req.body;
  if (!courseId) return res.status(400).json({ message: "courseId is required" });

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (section) course.section = String(section).trim();

  const exists = course.students.some((id) => String(id) === String(req.user._id));
  if (!exists) course.students.push(req.user._id);

  await course.save();
  return res.json({ message: "Enrolled" });
}

async function updateCourseSection(req, res) {
  const { id } = req.params;
  const { section } = req.body;
  if (!section) return res.status(400).json({ message: "section is required" });

  const course = await Course.findOne({ _id: id, students: req.user._id });
  if (!course) return res.status(404).json({ message: "Course not found for this student" });

  course.section = String(section).trim();
  await course.save();
  return res.json({ message: "Updated" });
}

async function dropCourse(req, res) {
  const { id } = req.params;

  const course = await Course.findOne({ _id: id, students: req.user._id });
  if (!course) return res.status(404).json({ message: "Course not found for this student" });

  course.students = course.students.filter((sid) => String(sid) !== String(req.user._id));
  await course.save();
  return res.json({ message: "Dropped" });
}

module.exports = { listMyCourses, enrollCourse, updateCourseSection, dropCourse };
