// Express server for tutor app
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    process.env.CORS_ORIGIN || "http://localhost:3000",
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:3000",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tutorapp";
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    console.log(`📍 Database: ${mongoURI}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("\n🔧 To fix this:");
    console.log(
      "1. For local MongoDB: Start MongoDB service (net start MongoDB)"
    );
    console.log("2. For MongoDB Atlas: Update MONGODB_URI in your .env file");
    console.log("3. Create a .env file with your MongoDB connection string");
    process.exit(1);
  });

// Use tutors router
const tutorsRouter = require("./routes/tutors");
app.use("/api/tutors", tutorsRouter);

// Use parents router
const parentsRouter = require("./routes/parents");
app.use("/api/parents", parentsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
