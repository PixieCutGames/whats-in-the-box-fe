import Branding from "../../shared/components/ui/Branding";
import AuthForms from "./AuthForms";

function AuthorizationPage() {
  return (
    <div className="min-h-screen lg:flex lg:flex-row bg-background dark:bg-background-dark">
      <Branding />
      <AuthForms />
    </div>
  );
}

export default AuthorizationPage;
