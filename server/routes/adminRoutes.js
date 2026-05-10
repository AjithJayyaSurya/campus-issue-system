import express from "express";
import {
  assignIssue,
  getAssignedIssues,
  getAllStaff,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin → assign issue
router.post("/assign", protect, authorizeRoles("admin"), assignIssue);

// Staff → view assigned issues
router.get("/assigned", protect, authorizeRoles("staff"), getAssignedIssues);

// Admin → get all staff members
router.get("/staff", protect, authorizeRoles("admin"), getAllStaff);

export default router;