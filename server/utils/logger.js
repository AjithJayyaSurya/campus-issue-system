import Log from "../models/Log.js";

export const createLog = async ({ action, issueId, userId, message }) => {
  try {
    await Log.create({
      action,
      issueId,
      userId,
      message,
    });
  } catch (error) {
    console.error("Log error:", error.message);
  }
};