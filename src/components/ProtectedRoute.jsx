import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  // Handle loading state or initialization
  if (auth === undefined || auth === null) {
    return <div>Loading...</div>;
  }

  // Check for authentication
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
