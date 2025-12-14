// services/api.ts

// Detect if running in development or production
const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const API_BASE_URL = isDevelopment
  ? "http://localhost:8000" // Your local backend during development
  : "https://homesolutions-backend.onrender.com"; // Replace with your production API URL

export default API_BASE_URL;
