import Branding from "../../shared/components/ui/Branding";
import ForgotPasswordForm from "./ForgotPasswordForm";

function ForgotPasswordPage() {
  return (
    <div className="min-h-screen lg:flex lg:flex-row bg-background dark:bg-background-dark">
      <Branding />
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordPage;
