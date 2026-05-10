import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import IssueCard from "../../components/issue/IssueCard";
import FilterBar from "../../components/issue/FilterBar";
import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";
import { adminService } from "../../services/adminService";

const StaffAssignedIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "",
    category: "",
  });

  useEffect(() => {
    fetchAssignedIssues();
  }, []);

  const fetchAssignedIssues = async () => {
    setLoading(true);
    setError("");
    try {
      // This endpoint returns issues assigned to the current staff member
      const data = await adminService.getAssignedIssues();
      setIssues(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to fetch assigned issues. Please try again.");
      console.error(err);
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
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ margin: "0 0 10px 0" }}>Your Assigned Issues 👤</h1>
          <p style={{ color: "#666", margin: 0 }}>
            Total {filteredIssues.length} of {issues.length} issue{issues.length !== 1 ? "s" : ""}
          </p>
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
              {issues.length === 0 ? "📭 No issues assigned yet" : "🔍 No issues match your filters"}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StaffAssignedIssuesPage;
