// Test MongoDB connection
const mongoose = require("mongoose");

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect("mongodb://localhost:27017/tutorapp");
    console.log("✅ Successfully connected to MongoDB!");

    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String,
      test: Boolean,
    });

    const TestModel = mongoose.model("Test", testSchema);
    const testDoc = new TestModel({ name: "Test Document", test: true });
    await testDoc.save();
    console.log("✅ Successfully saved test document!");

    // Clean up
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log("✅ Test completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("\nTo fix this:");
    console.log(
      "1. Install MongoDB: https://www.mongodb.com/try/download/community"
    );
    console.log("2. Start MongoDB service: net start MongoDB");
    console.log(
      "3. Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas"
    );
    process.exit(1);
  }
}

testConnection();
