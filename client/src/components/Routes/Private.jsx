import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const PrivateRoute = ({ children }) => {
  const [auth] = useAuth();

  return auth?.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
