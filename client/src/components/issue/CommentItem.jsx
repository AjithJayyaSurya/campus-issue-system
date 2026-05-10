const CommentItem = ({ comment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div
      style={{
        padding: "15px",
        background: "#f9f9f9",
        borderRadius: "6px",
        border: "1px solid #f0f0f0",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
        <div>
          <p style={{ margin: "0 0 2px 0", color: "#333", fontWeight: "600", fontSize: "14px" }}>
            {comment.createdBy?.name || "Anonymous"}
          </p>
          <p style={{ margin: 0, color: "#999", fontSize: "12px" }}>
            {formatDate(comment.createdAt)}
          </p>
        </div>
      </div>
      <p
        style={{
          margin: 0,
          color: "#666",
          fontSize: "14px",
          lineHeight: "1.5",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {comment.message}
      </p>
    </div>
  );
};

export default CommentItem;
