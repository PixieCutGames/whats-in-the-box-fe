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
import { AlertCircle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../shared/components/ui/Button";

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
              <div className="mx-auto mb-4 w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-success" />
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
              <p className="text-center text-sm text-muted-foreground">
                Auto-redirecting in {redirectCountdown} seconds...
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Choose a new password</CardTitle>
            </CardHeader>
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
                    <label
                      htmlFor="password"
                      className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
                    >
                      Password
                    </label>
                    <PasswordInput
                      name="password"
                      id="password"
                      placeholder="********"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-destructive"
                    />
                  </div>

                  {/* Confiem Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
                    >
                      Confirm Password
                    </label>
                    <PasswordInput
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="********"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-sm text-destructive"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col gap-2 pb-6">
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 w-full ${
                        !isValid && "opacity-50"
                      }`}
                    >
                      {isSubmitting
                        ? "Resetting password..."
                        : "Reset password"}
                    </button>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-primary underline-offset-4 h-9 py-2 has-[>svg]:px-3 px-0 text-sm"
                      aria-label="Back to login"
                    >
                      Back to login
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
            {!!resetPasswordError && (
              <div
                role="alert"
                className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
              >
                <AlertCircle className="size-4" />
                <div className="text-destructive/90 text-sm leading-relaxed ml-5">
                  Error: {resetPasswordError.message}
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordForm;
