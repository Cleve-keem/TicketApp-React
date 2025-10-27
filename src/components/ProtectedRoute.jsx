import { Outlet, Navigate } from "react-router-dom";
import { getSession } from "../services/authService";

export default function ProtectedRoute() {
  const session = getSession();
  if (!session) {
    // session missing or expired
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
}
