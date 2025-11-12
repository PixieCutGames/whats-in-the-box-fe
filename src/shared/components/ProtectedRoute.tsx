// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

export function ProtectedRoute() {
  const { userIsLoading, userIsAuthenticated } = useUser();

  if (userIsLoading) return <div>Loading...</div>;
  if (!userIsAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
