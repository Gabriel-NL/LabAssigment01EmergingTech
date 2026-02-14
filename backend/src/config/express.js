const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { clientOrigin } = require("./config");

const authRoutes = require("../routes/auth.routes");
const studentRoutes = require("../routes/student.routes");
const adminRoutes = require("../routes/admin.routes");

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use(
    cors({
      origin: clientOrigin,
      credentials: true
    })
  );

  app.get("/api/health", (req, res) => res.json({ ok: true }));

  app.use("/api/auth", authRoutes);
  app.use("/api/student", studentRoutes);
  app.use("/api/admin", adminRoutes);

  app.use((req, res) => res.status(404).json({ message: "Not found" }));

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Server error" });
  });

  return app;
}

module.exports = { createApp };
