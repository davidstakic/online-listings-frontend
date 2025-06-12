import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Login/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, userRole, getUserInfo } = useAuth();

  const user = getUserInfo();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
