import express from "express";
import {
  addComment,
  getComments,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add comment
router.post("/", protect, addComment);

// Get comments for a specific issue
router.get("/:issueId", protect, getComments);

export default router;