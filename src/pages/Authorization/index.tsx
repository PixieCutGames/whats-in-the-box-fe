import Branding from "./Branding";
import AuthForms from "./AuthForms";

function AuthorizationPage() {
  return (
    <div className="min-h-screen lg:flex lg:flex-row bg-background">
      <Branding />
      <AuthForms />
    </div>
  );
}

export default AuthorizationPage;
