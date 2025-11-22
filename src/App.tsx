import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { AuthRedirect } from "./shared/components/AuthRedirect";
import Logout from "./shared/components/Logout";
import QuickSearchPage from "./pages/Search/Quick";
import ProtectedSkeleton from "./shared/components/skeleton/ProtectedSkeleton";
import AuthorizationPage from "./pages/Authorization";
import ForgotPasswordPage from "./pages/ForgotPassword";
import VerifyEmailPage from "./pages/VerifyEmail";
import VerficationPage from "./pages/Verfication";
import ResetPasswordPage from "./pages/ResetPassword";
import Toaster from "./shared/components/Toaster";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const ContainersPage = lazy(() => import("./pages/Containers"));
const NewContainer = lazy(() => import("./pages/Container/NewContainer"));
const ContainerDetails = lazy(
  () => import("./pages/Container/ContainerDetails")
);
const EditContainer = lazy(() => import("./pages/Container/EditContainer"));

const ItemsPage = lazy(() => import("./pages/Items"));
const NewItemPage = lazy(() => import("./pages/Item/NewItem"));
const ItemDetailsPage = lazy(() => import("./pages/Item/ItemDetails"));
const EditItemPage = lazy(() => import("./pages/Item/EditItem"));

const AdvancedSearch = lazy(() => import("./pages/Search/Advanced"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePassword"));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          console.log(error);
          return failureCount < 2 ? true : false;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Routes for unauthenticated users */}
          <Route element={<AuthRedirect />}>
            <Route path="/login" element={<AuthorizationPage />} />
            <Route path="/register" element={<AuthorizationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
          <Route path="/verification" element={<VerficationPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          {/* Routes for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<ProtectedSkeleton />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/boxes"
              element={
                <Suspense fallback={<ProtectedSkeleton />}>
                  <ContainersPage />
                </Suspense>
              }
            />
            <Route
              path="/items"
              element={
                <Suspense fallback={<ProtectedSkeleton />}>
                  <ItemsPage />
                </Suspense>
              }
            />
            <Route path="/item">
              <Route
                path="new"
                element={
                  <Suspense fallback={<ProtectedSkeleton />}>
                    <NewItemPage />
                  </Suspense>
                }
              />
              <Route
                path="edit"
                element={
                  <Suspense fallback={<ProtectedSkeleton />}>
                    <EditItemPage />
                  </Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <Suspense fallback={<ProtectedSkeleton />}>
                    <ItemDetailsPage />
                  </Suspense>
                }
              />
              <Route index element={<Navigate to="new" replace />} />
            </Route>
            <Route path="/box">
              <Route
                path="new"
                element={
                  <Suspense fallback={<ProtectedSkeleton />}>
                    <NewContainer />
                  </Suspense>
                }
              />
              <Route
                path="edit"
                element={
                  <Suspense fallback={<ProtectedSkeleton />}>
                    <EditContainer />
                  </Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <Suspense fallback={<ProtectedSkeleton />}>
                    <ContainerDetails />
                  </Suspense>
                }
              />
              <Route index element={<Navigate to="new" replace />} />
            </Route>
            <Route path="/quick" element={<QuickSearchPage />} />
            <Route
              path="/search"
              element={
                <Suspense fallback={<ProtectedSkeleton />}>
                  <AdvancedSearch />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<ProtectedSkeleton />}>
                  <ProfilePage />
                </Suspense>
              }
            />
            <Route
              path="/change-password"
              element={
                <Suspense fallback={<ProtectedSkeleton />}>
                  <ChangePasswordPage />
                </Suspense>
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Route>
          {/* TODO: add 404 page */}
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
