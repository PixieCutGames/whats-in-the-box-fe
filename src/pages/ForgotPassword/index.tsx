import Branding from "../../shared/components/Branding";
import ForgotPasswordForm from "./ForgotPasswordForm";

function ForgotPasswordPage() {
  return (
    <div className="min-h-screen lg:flex lg:flex-row bg-background">
      <Branding />
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordPage;
