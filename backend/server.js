// Express server for tutor app
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.CORS_ORIGIN,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
      "http://localhost:3000",
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://127.0.0.1:3000",
      /^https:\/\/.*\.vercel\.app$/, // Allow all Vercel preview deployments
    ].filter(Boolean);

    if (
      allowedOrigins.some((allowed) => {
        if (typeof allowed === "string") {
          return origin === allowed || origin.startsWith(allowed);
        }
        if (allowed instanceof RegExp) {
          return allowed.test(origin);
        }
        return false;
      })
    ) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now (you can restrict this)
    }
  },
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

// Export for Vercel serverless functions
module.exports = app;

// Only start server if not in Vercel environment
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
