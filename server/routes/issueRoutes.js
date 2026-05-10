import express from "express";
import {
  createIssue,
  getAllIssues,
  getMyIssues,
  getIssueById,
  updateIssueStatus,
} from "../controllers/issueController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ================= CREATE ISSUE =================
// Student → create issue (with image)
router.post("/", protect, upload.single("image"), createIssue);

// ================= GET ISSUES =================

// Admin/Staff → view all issues
router.get("/", protect, authorizeRoles("admin", "staff"), getAllIssues);

// Student → view own issues
router.get("/my", protect, getMyIssues);

// Get issue by ID (all authenticated users)
router.get("/:id", protect, getIssueById);

// ================= UPDATE STATUS =================

// Staff → update issue status (only assigned staff)
router.put(
  "/:id/status",
  protect,
  authorizeRoles("staff"),
  updateIssueStatus
);

export default router;