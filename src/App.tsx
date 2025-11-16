import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthorizationPage from "./pages/Authorization";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { AuthRedirect } from "./shared/components/AuthRedirect";
import VerficationPage from "./pages/Verfication";
import VerifyEmailPage from "./pages/VerifyEmail";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import Logout from "./shared/components/Logout";
import ContainersPage from "./pages/Containers";
import NewContainer from "./pages/Container/NewContainer";
import ContainerDetails from "./pages/Container/ContainerDetails";
import EditContainer from "./pages/Container/EditContainer";

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
