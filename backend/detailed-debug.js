// Detailed Debug for MongoDB Connection
require("dotenv").config();

console.log("🔍 Detailed MongoDB Connection Debug");
console.log("=".repeat(60));

if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  console.log("📄 Full Connection String:");
  console.log(uri);
  console.log();

  // Extract and analyze each part
  const match = uri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^\/]+)\/([^?]+)/);

  if (match) {
    const [, username, password, cluster, database] = match;

    console.log("🔍 Detailed Analysis:");
    console.log("Username:", username);
    console.log("Username length:", username.length);
    console.log("Username decoded:", decodeURIComponent(username));
    console.log();

    console.log("Password:", password);
    console.log("Password length:", password.length);
    console.log("Password decoded:", decodeURIComponent(password));
    console.log();

    console.log("Cluster:", cluster);
    console.log("Database:", database);

    // Check for common issues
    console.log("\n🔍 Potential Issues:");

    if (password.includes("%")) {
      console.log("⚠️  Password contains URL encoded characters");
      console.log("   Make sure you're not double-encoding");
    }

    if (username.includes("%40") && username.includes("@")) {
      console.log("⚠️  Username might be double-encoded");
    }

    if (password.length !== 10) {
      console.log(`⚠️  Password length is ${password.length}, expected 10`);
    }

    // Test if we can decode properly
    try {
      const decodedUser = decodeURIComponent(username);
      const decodedPass = decodeURIComponent(password);
      console.log("\n✅ Decoded credentials:");
      console.log("Decoded username:", decodedUser);
      console.log("Decoded password:", decodedPass);
    } catch (e) {
      console.log("❌ Error decoding credentials:", e.message);
    }
  } else {
    console.log("❌ Could not parse connection string");
  }
} else {
  console.log("❌ MONGODB_URI not found");
}

console.log("\n" + "=".repeat(60));
console.log("💡 Next steps:");
console.log("1. Check if your password is exactly 10 characters");
console.log("2. Make sure you're not double-encoding special characters");
console.log("3. Verify the username exists in Atlas Database Access");
console.log(
  "4. Check if the user has 'Read and write to any database' permissions"
);
