const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

// Load config BEFORE DB connection
dotenv.config({ path: "backend/config/config.env" });

// Connect to database
connectDatabase();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
