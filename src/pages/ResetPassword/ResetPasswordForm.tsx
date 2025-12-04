import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/components/ui/Card";
import { ErrorMessage, Form, Formik } from "formik";
import PasswordInput from "../../shared/components/form/PasswordInput";
import { Navigate, useSearchParams, useNavigate, Link } from "react-router";
import useResetPassword from "../../shared/hooks/useResetPassword";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../shared/components/ui/Button";
import Label from "../../shared/components/form/Label";
import FormErrors from "../../shared/components/form/FormErrors";

// Validation schema using Yup
const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be 8 charactes atleast!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match!")
    .required("Password is required!"),
});

function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { resetPassword, resetPasswordError, resetPasswordData } =
    useResetPassword();

  const [resetComplete, setResetComplete] = useState<boolean>(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  useEffect(() => {
    if (resetPasswordData && redirectCountdown > 0) {
      const countdownTimer = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdownTimer);
    } else if (resetPasswordData && redirectCountdown === 0) {
      // Redirect to login
      handleContinueToLogin();
    }
  }, [resetPasswordData, redirectCountdown]);

  if (!token) return <Navigate to="/login" replace />;

  const handleContinueToLogin = () => navigate("/login", { replace: true });
  return (
    <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
      <div className="w-full max-w-md">
        {resetComplete ? (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-20 h-20 bg-success/10 dark:bg-success-dark/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-success dark:text-success-dark" />
              </div>
              <CardTitle>Your password has been reset</CardTitle>
              <CardDescription>
                You can now log in with your new password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleContinueToLogin} className="w-full">
                Continue to login
              </Button>
              <p className="text-center text-sm text-muted-foreground dark:text-muted-dark-foreground">
                Auto-redirecting in {redirectCountdown} seconds...
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Choose a new password</CardTitle>
            </CardHeader>
            {resetPasswordError && (
              <div className="px-6">
                <FormErrors
                  errorTitle="Reset Failed"
                  errorMessage={resetPasswordError.message}
                />
              </div>
            )}
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={passwordSchema}
              onSubmit={({ password }, { setSubmitting }) => {
                resetPassword(
                  token,
                  password,
                  () => {
                    setSubmitting(false);
                    setResetComplete(true);
                  },
                  () => setSubmitting(false)
                );
              }}
            >
              {({ isSubmitting, isValid }) => (
                <Form className="space-y-4 px-6 last:pb-6">
                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      name="password"
                      id="password"
                      placeholder="********"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-destructive dark:text-destructive-dark"
                    />
                  </div>

                  {/* Confiem Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <PasswordInput
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="********"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-sm text-destructive dark:text-destructive-dark"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col gap-2 pb-6">
                    <Button
                      type="submit"
                      className={`w-full ${
                        !isValid ? "opacity-50" : "opacity-100"
                      }`}
                      disabled={isSubmitting || !isValid}
                    >
                      {isSubmitting
                        ? "Resetting password..."
                        : "Reset password"}
                    </Button>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring dark:focus-visible:border-ring-dark focus-visible:ring-ring/50 dark:focus-visible:ring-ring-dark/50 focus-visible:ring-[3px] text-primary dark:text-primary-dark underline-offset-4 h-9 py-2 has-[>svg]:px-3 px-0 text-sm"
                      aria-label="Back to login"
                    >
                      Back to login
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordForm;
