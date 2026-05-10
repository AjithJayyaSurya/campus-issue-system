import { useState } from "react";
import { issueService } from "../../services/issueService";

const UpdateStatusModal = ({ issue, onUpdate, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState(issue?.status || "pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = [
    { value: "pending", label: "⏳ Pending" },
    { value: "assigned", label: "👤 Assigned" },
    { value: "resolved", label: "✅ Resolved" },
  ];

  const handleSubmit = async () => {
    if (selectedStatus === issue.status) {
      setError("Please select a different status");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await issueService.updateIssueStatus(issue._id, selectedStatus);
      onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "30px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: "0 0 10px 0", color: "#333", fontSize: "20px" }}>
          Update Status
        </h2>
        <p style={{ margin: "0 0 20px 0", color: "#666", fontSize: "14px" }}>
          {issue?.title}
        </p>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500", fontSize: "14px" }}>
            New Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "inherit",
            }}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            padding: "15px",
            background: "#f5f5f5",
            borderRadius: "6px",
            marginBottom: "20px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>Current Status:</strong> {issue?.status}
          </p>
          <p style={{ margin: "8px 0 0 0" }}>
            <strong>New Status:</strong> {selectedStatus}
          </p>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px",
              background: "#ffebee",
              color: "#d32f2f",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: "#f0f0f0",
              color: "#333",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || selectedStatus === issue?.status}
            style={{
              padding: "10px 20px",
              background: loading || selectedStatus === issue?.status ? "#ccc" : "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: loading || selectedStatus === issue?.status ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
