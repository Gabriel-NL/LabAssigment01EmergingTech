const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const { jwtSecret, cookieName, nodeEnv } = require("../config/config");

function cookieOptions() {
  const isProd = nodeEnv === "production";
  return {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
}

async function login(req, res) {
  const { studentNumber, password } = req.body;
  if (!studentNumber || !password) return res.status(400).json({ message: "Missing credentials" });

  const user = await Student.findOne({ studentNumber: String(studentNumber).trim() });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: "7d" });
  res.cookie(cookieName, token, cookieOptions());
  return res.json({ user: user.safe() });
}

async function logout(req, res) {
  res.clearCookie(cookieName);
  return res.json({ message: "Logged out" });
}

async function me(req, res) {
  return res.json({ user: req.user.safe() });
}

module.exports = { login, logout, me };
