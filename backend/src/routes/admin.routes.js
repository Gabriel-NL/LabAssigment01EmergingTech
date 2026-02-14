const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth.middleware");
const admin = require("../controllers/admin.controller");

router.post("/students", requireAuth, requireRole("admin"), admin.addStudent);
router.get("/students", requireAuth, requireRole("admin"), admin.listStudents);
router.get("/courses", requireAuth, requireRole("admin"), admin.listCourses);
router.get("/courses/:courseId/students", requireAuth, requireRole("admin"), admin.listStudentsInCourse);

module.exports = router;
