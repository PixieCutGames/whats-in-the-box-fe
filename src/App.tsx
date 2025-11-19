import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { AuthRedirect } from "./shared/components/AuthRedirect";
import Logout from "./shared/components/Logout";
import QuickSearchPage from "./pages/Search/Quick";

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

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
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
                <Suspense>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/boxes"
              element={
                <Suspense>
                  <ContainersPage />
                </Suspense>
              }
            />
            <Route
              path="/items"
              element={
                <Suspense>
                  <ItemsPage />
                </Suspense>
              }
            />
            <Route path="/item">
              <Route
                path="new"
                element={
                  <Suspense>
                    <NewItemPage />
                  </Suspense>
                }
              />
              <Route
                path="edit"
                element={
                  <Suspense>
                    <EditItemPage />
                  </Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <Suspense>
                    <ItemDetailsPage />
                  </Suspense>
                }
              />
              {/* TODO: add wildcard to reroute to items */}
            </Route>
            <Route path="/box">
              <Route
                path="new"
                element={
                  <Suspense>
                    <NewContainer />
                  </Suspense>
                }
              />
              <Route
                path="edit"
                element={
                  <Suspense>
                    <EditContainer />
                  </Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <Suspense>
                    <ContainerDetails />
                  </Suspense>
                }
              />
              {/* TODO: add wildcard to reroute to boxex */}
            </Route>
            <Route path="/quick" element={<QuickSearchPage />} />
            <Route
              path="/search"
              element={
                <Suspense>
                  <AdvancedSearch />
                </Suspense>
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route
            path="/*"
            element={
              <Suspense>
                <AuthorizationPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
