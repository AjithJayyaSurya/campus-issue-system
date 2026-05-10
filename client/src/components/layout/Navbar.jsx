import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        background: "#1a1a1a",
        color: "white",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button
          onClick={toggleSidebar}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          ☰
        </button>
        <h2 style={{ margin: 0 }}>Campus Issue System</h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#aaa" }}>
            {user?.role?.toUpperCase()}
          </p>
          <p style={{ margin: 0, fontWeight: "600" }}>{user?.name}</p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
