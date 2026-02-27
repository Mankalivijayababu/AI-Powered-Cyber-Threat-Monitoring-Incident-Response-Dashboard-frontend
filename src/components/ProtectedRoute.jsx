import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const tokenTime = localStorage.getItem("tokenTime");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // token expiry check (1 hour)
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  if (now - tokenTime > oneHour) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTime");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;