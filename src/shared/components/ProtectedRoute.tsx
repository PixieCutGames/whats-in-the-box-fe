// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

export function ProtectedRoute() {
  const { userIsLoading, userIsAuthenticated, userIsVerified, userEmail } =
    useUser();

  if (userIsLoading) return <div>Loading...</div>;
  if (!userIsAuthenticated) return <Navigate to="/login" replace />;
  if (!userIsVerified)
    return <Navigate to="/verification" replace state={{ email: userEmail }} />;

  return <Outlet />;
}
