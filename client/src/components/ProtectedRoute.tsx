import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function ProtectedRoute() {
  const { AuthStatus, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Checking session...</p>;
  }

  if (!AuthStatus) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
