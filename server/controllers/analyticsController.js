import Issue from "../models/Issue.js";

// GET ANALYTICS DATA
export const getAnalytics = async (req, res) => {
  try {
    // Total issues
    const totalIssues = await Issue.countDocuments();

    // Status counts
    const statusCounts = await Issue.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Category counts
    const categoryCounts = await Issue.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent issues (last 5)
    const recentIssues = await Issue.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status category createdAt");

    res.json({
      totalIssues,
      statusCounts,
      categoryCounts,
      recentIssues,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};