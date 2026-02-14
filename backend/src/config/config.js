require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  cookieName: process.env.COOKIE_NAME || "token",
  nodeEnv: process.env.NODE_ENV || "development"
};
