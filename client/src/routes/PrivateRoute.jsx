import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If specific roles are required, check if user has permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on user role instead of showing unauthorized page
    const roleRoutes = {
      student: "/student/dashboard",
      admin: "/admin/dashboard",
      staff: "/staff/dashboard",
    };
    const redirectPath = roleRoutes[user?.role] || "/student/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;
