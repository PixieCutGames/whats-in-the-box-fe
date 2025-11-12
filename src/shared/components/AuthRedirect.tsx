// src/components/AuthRedirect.tsx
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

export function AuthRedirect() {
  const { userIsLoading, userIsAuthenticated } = useUser();

  if (userIsLoading) return <div>Loading...</div>;
  if (userIsAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />; // render login/register routes
}
