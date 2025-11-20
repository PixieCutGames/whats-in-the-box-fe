import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Containers from "./Containers";
import Items from "./Items";

function ProtectedSkeleton() {
  const { pathname } = useLocation();

  if (pathname === "/") return <Dashboard />;
  if (pathname === "/boxes") return <Containers />;
  if (pathname === "/items") return <Items />;
  return <div>Loading...</div>;
}

export default ProtectedSkeleton;
