import { Navigate, Outlet } from "react-router";
import useUser from "../hooks/useUser";
import Layout from "./Layout/Layout";
import ProtectedSkeleton from "./skeleton/ProtectedSkeleton";
import HeaderSkeleton from "./skeleton/Header";

export function ProtectedRoute() {
  const { userIsLoading, userIsAuthenticated, userIsVerified, userEmail } =
    useUser();

  if (userIsLoading)
    return (
      <>
        <HeaderSkeleton />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ProtectedSkeleton />
        </main>
      </>
    );
  if (!userIsAuthenticated) return <Navigate to="/login" replace />;
  if (!userIsVerified)
    return <Navigate to="/verification" replace state={{ email: userEmail }} />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
