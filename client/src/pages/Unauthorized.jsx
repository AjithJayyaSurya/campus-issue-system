import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ color: "#dc3545", fontSize: "48px", marginBottom: "20px" }}>⛔</h1>
        <h2 style={{ color: "#333", marginBottom: "10px" }}>Access Denied</h2>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          You don't have permission to access this page.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
