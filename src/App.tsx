import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthorizationPage from "./pages/Authorization";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { AuthRedirect } from "./shared/components/AuthRedirect";
import VerficationPage from "./pages/Verfication";
import VerifyEmailPage from "./pages/VerifyEmail";

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
          </Route>
          <Route path="/verification" element={<VerficationPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          {/* Routes for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/*" element={<AuthorizationPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
