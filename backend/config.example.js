// Environment Configuration Example
// Copy this file to .env and update the values

module.exports = {
  // MongoDB Configuration
  MONGODB_URI: "mongodb://localhost:27017/tutorapp",

  // Server Configuration
  PORT: 3001,
  NODE_ENV: "development",

  // For MongoDB Atlas (cloud), replace MONGODB_URI with your Atlas connection string
  // Example: 'mongodb+srv://username:password@cluster.mongodb.net/tutorapp?retryWrites=true&w=majority'

  // JWT Secret (for future authentication)
  JWT_SECRET: "your-super-secret-jwt-key-change-this-in-production",

  // CORS Configuration
  CORS_ORIGIN: "http://localhost:3000",
};
