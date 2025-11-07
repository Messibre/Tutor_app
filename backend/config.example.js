// Environment Configuration Example

module.exports = {
  // MongoDB Configuration
  MONGODB_URI: "mongodb://localhost:27017/tutorapp",

  // Server Configuration
  PORT: 3001,
  NODE_ENV: "development",

  // JWT Secret (for future authentication)
  JWT_SECRET: "your-super-secret-jwt-key-change-this-in-production",

  // CORS Configuration
  CORS_ORIGIN: "http://localhost:3000",
};
