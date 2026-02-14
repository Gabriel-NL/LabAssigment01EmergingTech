const router = require("express").Router();
const { requireAuth } = require("../middleware/auth.middleware");
const auth = require("../controllers/auth.controller");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/me", requireAuth, auth.me);

module.exports = router;
