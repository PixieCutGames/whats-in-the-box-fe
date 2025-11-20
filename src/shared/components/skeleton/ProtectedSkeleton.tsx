import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Containers from "./Containers";

function ProtectedSkeleton() {
  const { pathname } = useLocation();

  if (pathname === "/") return <Dashboard />;
  if (pathname === "/boxes") return <Containers />;
  return <div>Loading...</div>;
}

export default ProtectedSkeleton;
