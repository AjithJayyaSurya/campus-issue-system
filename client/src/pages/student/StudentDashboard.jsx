import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div>
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ margin: "0 0 10px 0" }}>Welcome, {user?.name || "Student"}! 📚</h1>
          <p style={{ color: "#666", margin: 0 }}>Here's your dashboard overview</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          <div
            style={{
              background: "#e7f3ff",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #007bff",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => navigate("/student/create-issue")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{ color: "#007bff", marginBottom: "10px", margin: "0 0 10px 0" }}>➕ Create Issue</h3>
            <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>Report a new issue on campus</p>
          </div>

          <div
            style={{
              background: "#fff3cd",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ffc107",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => navigate("/student/my-issues")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{ color: "#ff9800", marginBottom: "10px", margin: "0 0 10px 0" }}>📋 My Issues</h3>
            <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>View issues you've reported</p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
