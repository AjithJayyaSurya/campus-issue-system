import { useEffect, useState } from "react";
import { issueService } from "../services/issueService";
import IssueCard from "../issue/IssueCard";
import AssignIssueModal from "./AssignIssueModal";

const AdminDashboardPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = await issueService.getIssues();
      setIssues(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignClick = (issue) => {
    setSelectedIssue(issue);
    setShowAssignModal(true);
  };

  const handleAssignSuccess = () => {
    setShowAssignModal(false);
    setSelectedIssue(null);
    fetchIssues();
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 style={{ margin: "0 0 30px 0", color: "#333", fontSize: "28px" }}>
        All Issues
      </h1>

      {/* Filter Bar */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "10px 15px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        />
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
          Loading issues...
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
          No issues found
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
              onClick={() => handleAssignClick(issue)}
              disabled={issue.status === "resolved"}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                background: issue.status === "resolved" ? "#ccc" : "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: issue.status === "resolved" ? "not-allowed" : "pointer",
              }}
            >
              {issue.assignedTo ? "Reassign" : "Assign to Staff"}
            </button>
          </div>
        ))}
      </div>

      {showAssignModal && selectedIssue && (
        <AssignIssueModal
          issue={selectedIssue}
          onAssign={handleAssignSuccess}
          onClose={() => setShowAssignModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
