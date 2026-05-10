import dotenv from "dotenv";

// Load environment variables FIRST
dotenv.config();

// Initialize Cloudinary AFTER dotenv loads
import { initializeCloudinary } from "./config/cloudinary.js";
initializeCloudinary();

import app from "./app.js";
import connectDB from "./config/db.js";

// Verify env vars are loaded
console.log("✓ Environment loaded");
console.log("  MongoDB:", process.env.MONGO_URI ? "✓" : "✗");
console.log("  Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "✓" : "✗");
console.log("  Cloudinary API Key:", process.env.CLOUDINARY_API_KEY ? "✓" : "✗");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});