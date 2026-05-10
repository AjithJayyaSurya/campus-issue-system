import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div>
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ margin: "0 0 10px 0" }}>Welcome, {user?.name || "Staff"}! 🔧</h1>
          <p style={{ color: "#666", margin: 0 }}>Manage your assigned issues here</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          <div
            style={{
              background: "#e3f2fd",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #2196f3",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => navigate("/staff/assigned-issues")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{ color: "#2196f3", margin: "0 0 10px 0" }}>📋 Your Assigned Issues</h3>
            <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>View and manage issues assigned to you</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;

