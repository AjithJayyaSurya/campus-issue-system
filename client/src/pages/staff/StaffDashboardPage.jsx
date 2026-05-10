import { useEffect, useState } from "react";
import { adminService } from "../services/adminService";
import IssueCard from "../issue/IssueCard";
import UpdateStatusModal from "../staff/UpdateStatusModal";

const StaffDashboardPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchAssignedIssues();
  }, []);

  const fetchAssignedIssues = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAssignedIssues();
      setIssues(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load assigned issues");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (issue) => {
    setSelectedIssue(issue);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateModal(false);
    setSelectedIssue(null);
    fetchAssignedIssues();
  };

  const filteredIssues = issues.filter((issue) => {
    if (filterStatus === "all") return true;
    return issue.status === filterStatus;
  });

  const stats = {
    total: issues.length,
    pending: issues.filter((i) => i.status === "pending").length,
    assigned: issues.filter((i) => i.status === "assigned").length,
    resolved: issues.filter((i) => i.status === "resolved").length,
  };

  return (
    <div>
      <h1 style={{ margin: "0 0 30px 0", color: "#333", fontSize: "28px" }}>
        My Assigned Issues
      </h1>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: 0, color: "#999", fontSize: "12px", textTransform: "uppercase" }}>
            Total
          </p>
          <p style={{ margin: "8px 0 0 0", color: "#333", fontSize: "28px", fontWeight: "bold" }}>
            {stats.total}
          </p>
        </div>
        <div style={{ background: "#fff3cd", padding: "20px", borderRadius: "8px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: 0, color: "#ff9800", fontSize: "12px", textTransform: "uppercase" }}>
            Pending
          </p>
          <p style={{ margin: "8px 0 0 0", color: "#ff9800", fontSize: "28px", fontWeight: "bold" }}>
            {stats.pending}
          </p>
        </div>
        <div style={{ background: "#e3f2fd", padding: "20px", borderRadius: "8px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: 0, color: "#2196f3", fontSize: "12px", textTransform: "uppercase" }}>
            Assigned
          </p>
          <p style={{ margin: "8px 0 0 0", color: "#2196f3", fontSize: "28px", fontWeight: "bold" }}>
            {stats.assigned}
          </p>
        </div>
        <div style={{ background: "#f1f8e9", padding: "20px", borderRadius: "8px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: 0, color: "#8bc34a", fontSize: "12px", textTransform: "uppercase" }}>
            Resolved
          </p>
          <p style={{ margin: "8px 0 0 0", color: "#8bc34a", fontSize: "28px", fontWeight: "bold" }}>
            {stats.resolved}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "30px" }}>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "10px 15px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            background: "white",
          }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          Loading assigned issues...
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "15px",
            background: "#ffebee",
            color: "#d32f2f",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {!loading && filteredIssues.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          No assigned issues found
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredIssues.map((issue) => (
          <div key={issue._id}>
            <IssueCard issue={issue} />
            <button
              onClick={() => handleUpdateClick(issue)}
              disabled={issue.status === "resolved"}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                background: issue.status === "resolved" ? "#ccc" : "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: issue.status === "resolved" ? "not-allowed" : "pointer",
              }}
            >
              {issue.status === "resolved" ? "Completed" : "Update Status"}
            </button>
          </div>
        ))}
      </div>

      {showUpdateModal && selectedIssue && (
        <UpdateStatusModal
          issue={selectedIssue}
          onUpdate={handleUpdateSuccess}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default StaffDashboardPage;
