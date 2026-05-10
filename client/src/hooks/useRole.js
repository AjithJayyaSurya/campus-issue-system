import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const hasRole = (role) => user?.role === role;

  const hasAnyRole = (roles) => roles.includes(user?.role);

  const isStudent = () => user?.role === "student";

  const isAdmin = () => user?.role === "admin";

  const isStaff = () => user?.role === "staff";

  return {
    role: user?.role,
    hasRole,
    hasAnyRole,
    isStudent,
    isAdmin,
    isStaff,
  };
};

export default useRole;
