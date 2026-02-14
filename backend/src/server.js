const { createApp } = require("./config/express");
const { connectDb } = require("./config/mongoose");
const { port } = require("./config/config");

const bcrypt = require("bcryptjs");
const Student = require("./models/Student");
const Course = require("./models/Course");

async function seed() {
  const adminSn = "admin001";
  const adminExists = await Student.findOne({ studentNumber: adminSn });

  if (!adminExists) {
    const passwordHash = await bcrypt.hash("Admin@123", 10);
    await Student.create({
      studentNumber: adminSn,
      passwordHash,
      firstName: "Admin",
      lastName: "User",
      email: "admin@test.com",
      program: "SET",
      favoriteTopic: "Security",
      strongestSkill: "System Design",
      role: "admin"
    });
  }

  const anyCourses = await Course.countDocuments();
  if (anyCourses === 0) {
    await Course.insertMany([
      { courseCode: "COMP308", courseName: "Emerging Technologies", section: "001", semester: "Winter 2026", students: [] },
      { courseCode: "COMP313", courseName: "Software Project Development II", section: "002", semester: "Winter 2026", students: [] },
      { courseCode: "COMP367", courseName: "DevOps Implementation", section: "003", semester: "Winter 2026", students: [] }
    ]);
  }

  console.log("Seed complete. Admin login: admin001 / Admin@123");
}

async function start() {
  await connectDb();

  if (process.argv.includes("--seed")) {
    await seed();
  }

  const app = createApp();
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});

