const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth.middleware");
const student = require("../controllers/student.controller");

router.get("/courses", requireAuth, requireRole("student"), student.listMyCourses);
router.post("/courses/enroll", requireAuth, requireRole("student"), student.enrollCourse);
router.patch("/courses/:id", requireAuth, requireRole("student"), student.updateCourseSection);
router.delete("/courses/:id", requireAuth, requireRole("student"), student.dropCourse);

module.exports = router;
