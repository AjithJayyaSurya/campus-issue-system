import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import IssueCard from "../components/issue/IssueCard";
import FilterBar from "../components/issue/FilterBar";
import Loader from "../components/common/Loader";
import Toast from "../components/common/Toast";
import { issueService } from "../services/issueService";

const IssueListPage = ({ title = "All Issues", showCreateButton = false }) => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "",
    category: "",
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await issueService.getIssues();
      setIssues(data);
    } catch (err) {
      setError("Failed to fetch issues. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    if (filterName === "reset") {
      setFilters({ searchTerm: "", status: "", category: "" });
    } else {
      setFilters({ ...filters, [filterName]: value });
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters({ ...filters, searchTerm });
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesStatus = !filters.status || issue.status === filters.status;
    const matchesCategory = !filters.category || issue.category === filters.category;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <DashboardLayout>
      <div>
        <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: "0 0 10px 0" }}>{title} 📊</h1>
            <p style={{ color: "#666", margin: 0 }}>
              Total {filteredIssues.length} of {issues.length} issue{issues.length !== 1 ? "s" : ""}
            </p>
          </div>
          {showCreateButton && (
            <button
              onClick={() => navigate("/student/create-issue")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              ➕ Report New Issue
            </button>
          )}
        </div>

        <FilterBar filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />

        {error && (
          <Toast message={error} type="error" duration={3000} onClose={() => setError("")} />
        )}

        {filteredIssues.length > 0 ? (
          <div style={{ display: "grid", gap: "15px" }}>
            {filteredIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        ) : (
          <div
            style={{
              background: "white",
              padding: "60px 40px",
              borderRadius: "8px",
              textAlign: "center",
              color: "#666",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              {issues.length === 0 ? "📭 No issues found" : "🔍 No issues match your filters"}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IssueListPage;
