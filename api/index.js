// Vercel serverless function entry point
// This file exports the Express app as a serverless function handler

const app = require("../backend/server");

// Export as Vercel serverless function
module.exports = app;
