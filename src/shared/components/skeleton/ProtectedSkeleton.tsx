import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Containers from "./Containers";
import Items from "./Items";
import Profile from "./Profile";
import ChangePasswordSkeleton from "./ChangePasswordSkeleton";
import SearchPageSkeleton from "./Search/Advanced";

function ProtectedSkeleton() {
  const { pathname } = useLocation();

  if (pathname === "/") return <Dashboard />;
  if (pathname === "/boxes") return <Containers />;
  if (pathname === "/items") return <Items />;
  if (pathname === "/profile") return <Profile />;
  if (pathname === "/change-password") return <ChangePasswordSkeleton />;
  if (pathname === "/search") return <SearchPageSkeleton />;
  return <div>Loading...</div>;
}

export default ProtectedSkeleton;
