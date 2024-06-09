import { Navigate } from "react-router-dom"
import { useAuth } from "../provider/authProvider.js"

const ProtectedRoute = ({ children }) => {
    const { authToken } = useAuth();
  
    if (!authToken) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;
  