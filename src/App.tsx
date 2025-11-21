import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { AuthRedirect } from "./shared/components/AuthRedirect";
import Logout from "./shared/components/Logout";
import QuickSearchPage from "./pages/Search/Quick";
import ProtectedSkeleton from "./shared/components/skeleton/ProtectedSkeleton";

const AuthorizationPage = lazy(() => import("./pages/Authorization"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const VerficationPage = lazy(() => import("./pages/Verfication"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmail"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPassword"));
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
            <Route
              path="/login"
              element={
                <Suspense>
                  <AuthorizationPage />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense>
                  <AuthorizationPage />
                </Suspense>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <Suspense>
                  <ForgotPasswordPage />
                </Suspense>
              }
            />
            <Route
              path="/reset-password"
              element={
                <Suspense>
                  <ResetPasswordPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/verification"
            element={
              <Suspense>
                <VerficationPage />
              </Suspense>
            }
          />
          <Route
            path="/verify-email"
            element={
              <Suspense>
                <VerifyEmailPage />
              </Suspense>
            }
          />
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
    </QueryClientProvider>
  );
}

export default App;
