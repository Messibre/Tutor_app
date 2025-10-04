// Test MongoDB Atlas Connection
const mongoose = require("mongoose");
require("dotenv").config();

async function testAtlasConnection() {
  try {
    console.log("🔍 Testing MongoDB Atlas connection...");
    console.log(
      "📍 Connection string:",
      process.env.MONGODB_URI ? "Found" : "Not found"
    );

    if (!process.env.MONGODB_URI) {
      console.log("❌ MONGODB_URI not found in .env file");
      console.log(
        "📝 Please create a .env file with your MongoDB Atlas connection string"
      );
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB Atlas!");

    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String,
      test: Boolean,
      timestamp: { type: Date, default: Date.now },
    });

    const TestModel = mongoose.model("Test", testSchema);
    const testDoc = new TestModel({
      name: "Atlas Test Document",
      test: true,
    });

    await testDoc.save();
    console.log("✅ Successfully saved test document to Atlas!");
    console.log("📄 Document ID:", testDoc._id);

    // Clean up
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log("✅ Test completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB Atlas connection failed:", error.message);

    if (error.message.includes("authentication failed")) {
      console.log("\n🔧 Authentication Error - Check your credentials:");
      console.log(
        "1. Verify your username and password in the connection string"
      );
      console.log(
        "2. Make sure you've URL encoded special characters (@ becomes %40)"
      );
      console.log("3. Check if your Atlas user has the correct permissions");
    } else if (error.message.includes("network")) {
      console.log("\n🔧 Network Error - Check your connection:");
      console.log("1. Verify your internet connection");
      console.log("2. Check if your IP is whitelisted in Atlas Network Access");
      console.log("3. Make sure your cluster is running");
    } else {
      console.log("\n🔧 General Error - Check your setup:");
      console.log("1. Verify your .env file exists and has MONGODB_URI");
      console.log("2. Check your connection string format");
      console.log("3. Make sure your Atlas cluster is accessible");
    }

    process.exit(1);
  }
}

testAtlasConnection();
