import { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";

const AssignIssueModal = ({ issue, onAssign, onClose }) => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await adminService.getAllStaff();
        setStaffList(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load staff members");
      }
    };

    fetchStaff();
  }, []);

  const handleSubmit = async () => {
    if (!selectedStaff) {
      setError("Please select a staff member");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await adminService.assignIssue(issue._id, selectedStaff);
      onAssign();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign issue");
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
          Assign Issue
        </h2>
        <p style={{ margin: "0 0 20px 0", color: "#666", fontSize: "14px" }}>
          {issue?.title}
        </p>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", color: "#333", fontWeight: "500", fontSize: "14px" }}>
            Select Staff Member
          </label>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "inherit",
            }}
          >
            <option value="">-- Choose Staff Member --</option>
            {staffList.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name} ({staff.email})
              </option>
            ))}
          </select>
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
            disabled={loading || !selectedStaff}
            style={{
              padding: "10px 20px",
              background: loading || !selectedStaff ? "#ccc" : "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: loading || !selectedStaff ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignIssueModal;
