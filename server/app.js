import express from "express";
import cors from "cors";
import cloudinary from "./config/cloudinary.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

// Middleware
import { protect } from "./middleware/authMiddleware.js";
import { authorizeRoles } from "./middleware/roleMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// ================= Middleware =================
app.use(cors({
  origin: ["https://campus-issue-system-main.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// ================= Routes =================

// Auth Routes
app.use("/api/auth", authRoutes);

// Issue Routes
app.use("/api/issues", issueRoutes);

// Comment Routes
app.use("/api/comments", commentRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Log Routes (Day 9)
app.use("/api/logs", logRoutes);

// Analytics Routes (Day 10)
app.use("/api/analytics", analyticsRoutes);

// ================= Root =================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ================= Test Routes =================

// Protected Route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// Admin Test Route (renamed to avoid conflict)
app.get("/api/admin-test", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Admin access granted",
  });
});

// Cloudinary Config Test Route
app.get("/api/test/cloudinary", (req, res) => {
  const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✓ Set" : "✗ Missing",
    api_key: process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ Missing",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ Missing",
  };
  res.json({
    message: "Cloudinary Configuration Status",
    config,
    cloudinaryConfigured: !!(process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET),
  });
});

// ================= Error Middleware =================
app.use(errorHandler);

// ================= Export =================
export default app;