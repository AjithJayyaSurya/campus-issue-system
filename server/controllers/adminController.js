import Assignment from "../models/Assignment.js";
import Issue from "../models/Issue.js";
import User from "../models/User.js";
import { createLog } from "../utils/logger.js";
import { sendEmail } from "../services/emailService.js";

// ASSIGN ISSUE TO STAFF
export const assignIssue = async (req, res) => {
  try {
    const { issueId, staffId } = req.body;

    // Check issue exists
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Prevent duplicate assignment
    const existing = await Assignment.findOne({ issueId });
    if (existing) {
      return res.status(400).json({ message: "Issue already assigned" });
    }

    const assignment = await Assignment.create({
      issueId,
      assignedTo: staffId,
      assignedBy: req.user._id,
    });

    // LOG
    await createLog({
      action: "ASSIGN_ISSUE",
      issueId,
      userId: req.user._id,
      message: "Issue assigned to staff",
    });

    // EMAIL (to staff)
    const staff = await User.findById(staffId);

    if (staff?.email) {
      await sendEmail(
        staff.email,
        "New Issue Assigned",
        `You have been assigned a new issue: "${issue.title}".`
      );
    }

    res.status(201).json({
      message: "Issue assigned successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STAFF → VIEW ASSIGNED ISSUES
export const getAssignedIssues = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      assignedTo: req.user._id,
    }).populate({
      path: "issueId",
      populate: {
        path: "createdBy",
        select: "name email",
      },
    });

    // Extract just the issues from assignments
    const issues = assignments.map((assignment) => assignment.issueId);

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL STAFF MEMBERS
export const getAllStaff = async (req, res) => {
  try {
    const staffMembers = await User.find({ role: "staff" }).select(
      "_id name email"
    );
    res.json(staffMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};