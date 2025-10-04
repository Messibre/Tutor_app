// Debug MongoDB Connection
require("dotenv").config();

console.log("🔍 Debugging MongoDB Connection...");
console.log("=".repeat(50));

// Check if .env file is loaded
console.log("📁 Environment variables loaded:");
console.log(
  "MONGODB_URI:",
  process.env.MONGODB_URI ? "✅ Found" : "❌ Missing"
);
console.log("PORT:", process.env.PORT || "❌ Missing");
console.log("NODE_ENV:", process.env.NODE_ENV || "❌ Missing");

if (process.env.MONGODB_URI) {
  console.log("\n🔗 Connection String Analysis:");
  const uri = process.env.MONGODB_URI;

  // Extract parts of the connection string
  const match = uri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^\/]+)\/([^?]+)/);

  if (match) {
    const [, username, password, cluster, database] = match;
    console.log("Username:", username);
    console.log(
      "Password:",
      password.length > 0
        ? "✅ Present (" + password.length + " chars)"
        : "❌ Empty"
    );
    console.log("Cluster:", cluster);
    console.log("Database:", database);

    // Check for special characters that need encoding
    const specialChars = /[@#%+&]/;
    if (specialChars.test(username)) {
      console.log(
        "⚠️  Username contains special characters that may need URL encoding"
      );
    }
    if (specialChars.test(password)) {
      console.log(
        "⚠️  Password contains special characters that may need URL encoding"
      );
    }
  } else {
    console.log("❌ Invalid connection string format");
    console.log(
      "Expected format: mongodb+srv://username:password@cluster.mongodb.net/database"
    );
  }
} else {
  console.log("\n❌ MONGODB_URI not found in .env file");
  console.log("Make sure your .env file contains:");
  console.log(
    "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tutorapp"
  );
}

console.log("\n" + "=".repeat(50));
console.log("💡 Common fixes:");
console.log("1. Check username/password are correct");
console.log("2. URL encode special characters (@ becomes %40)");
console.log("3. Make sure no extra spaces in .env file");
console.log("4. Verify Atlas user has read/write permissions");
