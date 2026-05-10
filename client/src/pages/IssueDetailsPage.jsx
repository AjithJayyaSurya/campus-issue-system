import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Loader from "../components/common/Loader";
import Toast from "../components/common/Toast";
import AssignIssueModal from "../components/admin/AssignIssueModal";
import UpdateStatusModal from "../components/staff/UpdateStatusModal";
import { issueService } from "../services/issueService";
import useAuth from "../hooks/useAuth";

const IssueDetailsPage = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchIssueDetails();
  }, [issueId]);

  const fetchIssueDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await issueService.getIssueById(issueId);
      setIssue(data);
    } catch (err) {
      setError("Failed to fetch issue details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignSuccess = () => {
    setShowAssignModal(false);
    setSuccessMessage("Issue assigned successfully!");
    setShowSuccess(true);
    fetchIssueDetails();
  };

  const handleStatusUpdateSuccess = () => {
    setShowStatusModal(false);
    setSuccessMessage("Status updated successfully!");
    setShowSuccess(true);
    fetchIssueDetails();
  };

  if (loading) {
    return <Loader />;
  }

  if (!issue || error) {
    return (
      <DashboardLayout>
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "8px",
            textAlign: "center",
            color: "#666",
          }}
        >
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>
            {error || "Issue not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Go Back
          </button>
        </div>
      </DashboardLayout>
    );
  }

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Determine which action buttons to show based on user role
  const canAssign = user?.role === "admin";
  const canUpdateStatus = user?.role === "admin" || user?.role === "staff";

  return (
    <DashboardLayout>
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "15px" }}>
              <div>
                <h1 style={{ margin: "0 0 10px 0", color: "#333" }}>{issue.title}</h1>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  Reported on {formatDate(issue.createdAt)}
                </p>
              </div>
              {issue.image && (
                <img
                  src={issue.image}
                  alt={issue.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    border: "1px solid #ddd",
                  }}
                />
              )}
            </div>
          </div>

          <div style={{ marginBottom: "25px", paddingBottom: "25px", borderBottom: "1px solid #f0f0f0" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>Description</h3>
            <p style={{ margin: 0, color: "#666", lineHeight: "1.6" }}>
              {issue.description}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div>
              <p style={{ margin: "0 0 10px 0", fontSize: "12px", fontWeight: "600", color: "#999" }}>
                CATEGORY
              </p>
              <p
                style={{
                  margin: 0,
                  padding: "8px 12px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {categoryIcons[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
              </p>
            </div>

            <div>
              <p style={{ margin: "0 0 10px 0", fontSize: "12px", fontWeight: "600", color: "#999" }}>
                STATUS
              </p>
              <p
                style={{
                  margin: 0,
                  padding: "8px 12px",
                  background: statusColor.bg,
                  color: statusColor.text,
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {statusColor.label}
              </p>
            </div>

            <div>
              <p style={{ margin: "0 0 10px 0", fontSize: "12px", fontWeight: "600", color: "#999" }}>
                REPORTED BY
              </p>
              <p
                style={{
                  margin: 0,
                  padding: "8px 12px",
                  background: "#e3f2fd",
                  color: "#2196f3",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {issue.createdBy?.name || "Anonymous"}
              </p>
            </div>
          </div>

          <p style={{ margin: "25px 0 0 0", fontSize: "12px", color: "#999" }}>
            Last updated on {formatDate(issue.updatedAt)}
          </p>
        </div>

        {/* Action Buttons Section */}
        {(canAssign || canUpdateStatus) && (
          <div
            style={{
              marginTop: "30px",
              background: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>Actions</h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {canAssign && status !== "resolved" && (
                <button
                  onClick={() => setShowAssignModal(true)}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#2196f3",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  👤 Assign to Staff
                </button>
              )}

              {canUpdateStatus && (
                <button
                  onClick={() => setShowStatusModal(true)}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  🔄 Update Status
                </button>
              )}

              {canAssign && (
                <button
                  onClick={() => {
                    setShowStatusModal(true);
                  }}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#ff9800",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                  title="Request more information from the reporter"
                >
                  ❓ Need More Info
                </button>
              )}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>💬 Comments & Updates</h3>
          <div
            style={{
              textAlign: "center",
              color: "#666",
              padding: "20px",
              background: "#f9f9f9",
              borderRadius: "6px",
            }}
          >
            <p style={{ margin: 0 }}>Comments section coming soon</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAssignModal && (
        <AssignIssueModal
          issue={issue}
          onAssign={handleAssignSuccess}
          onClose={() => setShowAssignModal(false)}
        />
      )}

      {showStatusModal && (
        <UpdateStatusModal
          issue={issue}
          onUpdate={handleStatusUpdateSuccess}
          onClose={() => setShowStatusModal(false)}
        />
      )}

      {/* Success Toast */}
      {showSuccess && (
        <Toast
          message={`✅ ${successMessage}`}
          type="success"
          duration={2000}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default IssueDetailsPage;
