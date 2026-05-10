import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Loader from "../components/common/Loader";
import PrivateRoute from "./PrivateRoute";
import StudentDashboard from "../pages/student/StudentDashboard";
import CreateIssuePage from "../pages/student/CreateIssuePage";
import MyIssuesPage from "../pages/student/MyIssuesPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllIssuesPage from "../pages/admin/AllIssuesPage";
import StaffDashboard from "../pages/staff/StaffDashboard";
import StaffAssignedIssuesPage from "../pages/staff/StaffAssignedIssuesPage";
import IssueDetailsPage from "../pages/IssueDetailsPage";
import useAuth from "../hooks/useAuth";

const AppRoutes = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/student/dashboard" replace /> : <Login />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/student/dashboard" replace /> : <Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/student/create-issue"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <CreateIssuePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/student/my-issues"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <MyIssuesPage />
            </PrivateRoute>
          }
        />

        {/* Issue Details - Protected for all authenticated users */}
        <Route
          path="/issue/:issueId"
          element={
            <PrivateRoute>
              <IssueDetailsPage />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/all-issues"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AllIssuesPage />
            </PrivateRoute>
          }
        />

        {/* Staff Routes */}
        <Route
          path="/staff/dashboard"
          element={
            <PrivateRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/staff/assigned-issues"
          element={
            <PrivateRoute allowedRoles={["staff"]}>
              <StaffAssignedIssuesPage />
            </PrivateRoute>
          }
        />

        {/* Catch all - Redirect to login if not authenticated, otherwise to student dashboard */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/student/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;