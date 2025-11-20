import { useLocation } from "react-router-dom";
import HeaderSkeleton from "./Header";
import Dashboard from "./Dashboard";

function ProtectedSkeleton() {
  const { pathname } = useLocation();

  const getPageSkeleton = () => {
    if (pathname === "/") {
      return <Dashboard />;
    }
    return <div>Loading...</div>;
  };
  return (
    <>
      {/* <HeaderSkeleton /> */}
      {getPageSkeleton()}
    </>
  );
}

export default ProtectedSkeleton;
