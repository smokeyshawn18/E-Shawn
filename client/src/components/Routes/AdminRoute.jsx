import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const AdminRoute = ({ children }) => {
  const [auth] = useAuth();

  // Check if user is authenticated and is an admin
  if (auth?.user?.role !== 1) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
