import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

function Logout() {
  const { logout } = useUser();
  logout();
  return <Navigate to="/login" />;
}

export default Logout;
