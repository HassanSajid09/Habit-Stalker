import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PubRoute = () => {
  return !isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} replace />
  );
};

export default PubRoute;
