import { useNavigate } from "react-router-dom";

const IssueCard = ({ issue }) => {
  const navigate = useNavigate();

  const statusColors = {
    pending: { bg: "#fff3cd", text: "#ff9800", label: "⏳ Pending" },
    assigned: { bg: "#e3f2fd", text: "#2196f3", label: "👤 Assigned" },
    resolved: { bg: "#f1f8e9", text: "#8bc34a", label: "✅ Resolved" },
  };

  const categoryIcons = {
    infrastructure: "🏗️",
    academic: "📚",
    facilities: "🏢",
    other: "📌",
  };

  const status = issue.status || "pending";
  const category = issue.category || "other";
  const statusColor = statusColors[status] || statusColors.pending;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={() => navigate(`/issue/${issue._id}`)}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#333", fontSize: "18px", fontWeight: "600" }}>
            {issue.title}
          </h3>
          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
            {issue.description?.substring(0, 80)}
            {issue.description?.length > 80 ? "..." : ""}
          </p>
        </div>
        {issue.image && (
          <img
            src={issue.image}
            alt={issue.title}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "6px",
              objectFit: "cover",
              marginLeft: "15px",
              border: "1px solid #ddd",
            }}
          />
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          paddingTop: "12px",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <span
            style={{
              background: "#f0f0f0",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "12px",
              color: "#666",
            }}
          >
            {categoryIcons[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>

          <span
            style={{
              background: statusColor.bg,
              color: statusColor.text,
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {statusColor.label}
          </span>
        </div>

        <span style={{ fontSize: "12px", color: "#999" }}>
          {formatDate(issue.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
