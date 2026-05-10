import { useNavigate, useLocation } from "react-router-dom";
import useRole from "../../hooks/useRole";

const Sidebar = ({ open, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isStudent, isAdmin, isStaff } = useRole();

  const studentMenuItems = [
    { label: "Dashboard", icon: "🏠", path: "/student/dashboard" },
    { label: "Create Issue", icon: "➕", path: "/student/create-issue" },
    { label: "My Issues", icon: "📋", path: "/student/my-issues" },
  ];

  const adminMenuItems = [
    { label: "Dashboard", icon: "🏠", path: "/admin/dashboard" },
    { label: "All Issues", icon: "📊", path: "/admin/all-issues" },
  ];

  const staffMenuItems = [
    { label: "Dashboard", icon: "🏠", path: "/staff/dashboard" },
    { label: "Assigned Issues", icon: "📋", path: "/staff/assigned-issues" },
  ];

  const getMenuItems = () => {
    if (isStudent()) return studentMenuItems;
    if (isAdmin()) return adminMenuItems;
    if (isStaff()) return staffMenuItems;
    return [];
  };

  const menuItems = getMenuItems();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 999,
            display: window.innerWidth > 768 ? "none" : "block",
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: open ? "250px" : "0",
          background: "#2c3e50",
          color: "white",
          transition: "width 0.3s ease",
          overflow: "hidden",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          position: window.innerWidth <= 768 ? "fixed" : "relative",
          height: "100vh",
          zIndex: 1000,
          top: 0,
          left: 0,
        }}
      >
        <div style={{ padding: "20px" }}>
          <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: "600" }}>
            MENU
          </h3>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menuItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    if (window.innerWidth <= 768) {
                      toggleSidebar();
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    background: isActive(item.path) ? "#3498db" : "transparent",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    fontWeight: isActive(item.path) ? "600" : "400",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.background = "rgba(255,255,255,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.background = "transparent";
                    }
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
