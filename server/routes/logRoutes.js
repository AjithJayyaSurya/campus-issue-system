import express from "express";
import Log from "../models/Log.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET LOGS
router.get("/:issueId", protect, async (req, res) => {
  try {
    const logs = await Log.find({
      issueId: req.params.issueId,
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;