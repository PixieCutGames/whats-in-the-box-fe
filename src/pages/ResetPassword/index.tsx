import Branding from "../../shared/components/ui/Branding";
import ResetPasswordForm from "./ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <div className="min-h-screen lg:flex lg:flex-row bg-background dark:bg-background-dark">
      <Branding />
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPasswordPage;
