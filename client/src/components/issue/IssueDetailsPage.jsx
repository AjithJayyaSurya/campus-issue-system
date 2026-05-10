import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { issueService } from "../../services/issueService";
import CommentSection from "./CommentSection";

const IssueDetailsPage = () => {
  const { issueId } = useParams();
  const { token } = useAuth();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true);
        const data = await issueService.getIssueById(issueId);
        setIssue(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load issue");
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [issueId]);

  const statusColors = {
    pending: { bg: "#fff3cd", text: "#ff9800" },
    assigned: { bg: "#e3f2fd", text: "#2196f3" },
    resolved: { bg: "#f1f8e9", text: "#8bc34a" },
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
        Loading issue details...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#d32f2f",
          background: "#ffebee",
          borderRadius: "8px",
        }}
      >
        {error}
      </div>
    );

  if (!issue)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
        Issue not found
      </div>
    );

  const status = issue.status || "pending";
  const statusColor = statusColors[status] || statusColors.pending;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "white",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Issue Details Section */}
      <div style={{ padding: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "20px" }}>
          <h1 style={{ margin: 0, color: "#333", fontSize: "28px" }}>
            {issue.title}
          </h1>
          <span
            style={{
              background: statusColor.bg,
              color: statusColor.text,
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {status}
          </span>
        </div>

        {issue.image && (
          <img
            src={issue.image}
            alt={issue.title}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #ddd",
            }}
          />
        )}

        <p
          style={{
            color: "#666",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "20px",
            whiteSpace: "pre-wrap",
          }}
        >
          {issue.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            paddingTop: "20px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <div>
            <label style={{ color: "#999", fontSize: "12px", textTransform: "uppercase" }}>
              Category
            </label>
            <p style={{ margin: "8px 0 0 0", color: "#333", fontWeight: "500", textTransform: "capitalize" }}>
              {issue.category}
            </p>
          </div>
          <div>
            <label style={{ color: "#999", fontSize: "12px", textTransform: "uppercase" }}>
              Created
            </label>
            <p style={{ margin: "8px 0 0 0", color: "#333", fontSize: "14px" }}>
              {formatDate(issue.createdAt)}
            </p>
          </div>
          <div>
            <label style={{ color: "#999", fontSize: "12px", textTransform: "uppercase" }}>
              Created By
            </label>
            <p style={{ margin: "8px 0 0 0", color: "#333", fontWeight: "500" }}>
              {issue.createdBy?.name || "Unknown"}
            </p>
          </div>
          {issue.assignedTo && (
            <div>
              <label style={{ color: "#999", fontSize: "12px", textTransform: "uppercase" }}>
                Assigned To
              </label>
              <p style={{ margin: "8px 0 0 0", color: "#333", fontWeight: "500" }}>
                {issue.assignedTo?.name || "Unassigned"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div style={{ borderTop: "1px solid #f0f0f0" }}>
        <CommentSection issueId={issueId} />
      </div>
    </div>
  );
};

export default IssueDetailsPage;
