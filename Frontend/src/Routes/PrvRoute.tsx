import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PrvRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={"/signin"} replace />;
};

export default PrvRoute;
