import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait for user data to be loaded
    if (!loading && user?.role) {
      if (user.role === "student") {
        navigate("/student/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "staff") {
        navigate("/staff/dashboard");
      }
    }
  }, [user?.role, loading, navigate]);

  // Show loader while auth is loading or waiting for role-based redirect
  if (loading || !user?.role) {
    return <Loader />;
  }

  return null; // This component just redirects
};

export default Dashboard;