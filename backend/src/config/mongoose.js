const mongoose = require("mongoose");
const { mongoUri } = require("./config");

async function connectDb() {
  if (!mongoUri) throw new Error("Missing MONGO_URI in .env");
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

module.exports = { connectDb };
