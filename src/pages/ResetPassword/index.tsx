import Branding from "../../shared/components/Branding";
import ResetPasswordForm from "./ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <div className="min-h-screen lg:flex lg:flex-row bg-background">
      <Branding />
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPasswordPage;
