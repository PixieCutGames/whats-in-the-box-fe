// src/components/AuthRedirect.tsx
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import GlobalLoading from "./skeleton/GlobalLoading";

export function AuthRedirect() {
  const { userIsLoading, userIsAuthenticated } = useUser();

  // TODO: implement lazy loading for nested components and add skeleton loader for them
  if (userIsLoading) return <GlobalLoading />;
  if (userIsAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />; // render login/register routes
}
