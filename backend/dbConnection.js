const mongoose = require("mongoose");

// Load environment variables
require("dotenv").config();

// MongoDB URI from .env
const mongooseURI = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(mongooseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
