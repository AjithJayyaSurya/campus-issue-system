import Issue from "../models/Issue.js";
import Assignment from "../models/Assignment.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import { createLog } from "../utils/logger.js";
import { sendEmail } from "../services/emailService.js";

// CREATE ISSUE
export const createIssue = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    let imageUrl = "";

    if (req.file) {
      try {
        console.log("📤 Uploading to Cloudinary...");
        console.log("   File:", req.file.filename);
        console.log("   Path:", req.file.path);

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "campus-issues",
          resource_type: "auto"
        });

        imageUrl = result.secure_url;
        console.log("✅ Upload successful:", imageUrl);
      } catch (uploadError) {
        console.error("❌ Cloudinary upload error:", uploadError);
        console.error("   Message:", uploadError.message);
        console.error("   HTTP Code:", uploadError.http_code);
        console.error("   Full Error:", JSON.stringify(uploadError, null, 2));

        return res.status(500).json({
          message: "Image upload failed: " + uploadError.message,
          error: uploadError.message
        });
      }
    }

    const issue = await Issue.create({
      title,
      description,
      category,
      image: imageUrl,
      createdBy: req.user._id,
    });

    // LOG
    await createLog({
      action: "CREATE_ISSUE",
      issueId: issue._id,
      userId: req.user._id,
      message: "Issue created",
    });

    // EMAIL (to creator)
    await sendEmail(
      req.user.email,
      "Issue Submitted",
      `Your issue "${issue.title}" has been created successfully.`
    );

    res.status(201).json(issue);
  } catch (error) {
    console.error("❌ Issue creation error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ISSUES
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("createdBy", "name email");
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY ISSUES
export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.user._id });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ISSUE BY ID
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate("createdBy", "name email");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ISSUE STATUS (STAFF ONLY)
export const updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const issueId = req.params.id;

    // Check assignment
    const assignment = await Assignment.findOne({
      issueId,
      assignedTo: req.user._id,
    });

    if (!assignment) {
      return res.status(403).json({
        message: "You are not assigned to this issue",
      });
    }

    // Validate status
    const allowedStatus = ["pending", "in-progress", "resolved"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.status = status;
    await issue.save();

    // LOG
    await createLog({
      action: "UPDATE_STATUS",
      issueId,
      userId: req.user._id,
      message: `Status updated to ${status}`,
    });

    // EMAIL (to issue owner)
    const issueOwner = await User.findById(issue.createdBy);

    if (issueOwner?.email) {
      await sendEmail(
        issueOwner.email,
        "Issue Status Updated",
        `Your issue "${issue.title}" is now ${status}.`
      );
    }

    res.json({
      message: "Issue status updated",
      issue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};