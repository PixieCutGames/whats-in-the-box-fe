import { Navigate, useSearchParams } from "react-router-dom";
import { tokenManager } from "../../lib/tokenManager";

function SocialSuccess() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const refreshToken = searchParams.get("refreshToken");

  if (!token || !refreshToken) return <Navigate to="/login" />;

  tokenManager.setTokens({ accessToken: token, refreshToken }, true);

  return <Navigate to="/" />;
}

export default SocialSuccess;
