import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { AuthRedirect } from "./shared/components/AuthRedirect";
import Logout from "./shared/components/Logout";

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
            <Route path="/login" element={<AuthorizationPage />} />
            <Route path="/register" element={<AuthorizationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
          <Route path="/verification" element={<VerficationPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          {/* Routes for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/boxes" element={<ContainersPage />} />
            <Route path="/box">
              {/* <Route index element={<Menu />} /> */}
              <Route path="new" element={<NewContainer />} />
              <Route path="edit" element={<EditContainer />} />
              <Route path=":id" element={<ContainerDetails />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/*" element={<AuthorizationPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
