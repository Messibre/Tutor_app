// API Configuration
// This file provides the base API URL for both development and production

// Determine if we're in development or production
const isDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.includes("localhost");

// Set API base URL
// In production (Vercel), API routes are at the same domain
// In development, use localhost:3001
const API_BASE_URL = isDevelopment ? "http://localhost:3001" : ""; // Empty string means same origin (Vercel)

// Export configuration
window.API_CONFIG = {
  baseURL: API_BASE_URL,
  isDevelopment: isDevelopment,
};

// Helper function to build full API URL
window.getApiUrl = function (endpoint) {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return API_BASE_URL ? `${API_BASE_URL}${cleanEndpoint}` : cleanEndpoint;
};
