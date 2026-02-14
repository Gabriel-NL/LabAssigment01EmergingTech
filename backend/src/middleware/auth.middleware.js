const jwt = require("jsonwebtoken");
const { jwtSecret, cookieName } = require("../config/config");
const Student = require("../models/Student");

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[cookieName];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const payload = jwt.verify(token, jwtSecret);
    const user = await Student.findById(payload.id);
    if (!user) return res.status(401).json({ message: "Invalid session" });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Not authenticated" });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    const userRole = String(req.user?.role || "").toLowerCase();
    if (userRole !== role) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

module.exports = { requireAuth, requireRole };
