import Comment from "../models/Comment.js";
import { createLog } from "../utils/logger.js";

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { issueId, message } = req.body;

    const comment = await Comment.create({
      issueId,
      userId: req.user._id,
      message,
    });

    await createLog({
      action: "ADD_COMMENT",
      issueId,
      userId: req.user._id,
      message: "Comment added",
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      issueId: req.params.issueId,
    }).populate("userId", "name email");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};