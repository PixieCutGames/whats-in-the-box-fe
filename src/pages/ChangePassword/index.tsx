import ChangePasswordForm from "../../shared/components/ChangePasswordForm";

function ChangePasswordPage() {
  return (
    <div className="py-6">
      <p className="text-muted-foreground text-sm">
        Enter your current password and choose a new password.
      </p>
      <div className="mt-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default ChangePasswordPage;
