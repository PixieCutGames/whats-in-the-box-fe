import { ErrorMessage, Form, Formik } from "formik";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/components/ui/Card";
import * as Yup from "yup";
import { Button } from "../../shared/components/ui/Button";
import { Link } from "react-router-dom";
import useResetPassword from "../../shared/hooks/useResetPassword";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import FormErrors from "../../shared/components/form/FormErrors";
import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";

// Validation schema using Yup
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address!")
    .required("Email is required!"),
});

function ForgotPasswordForm() {
  const {
    generateResetPasswordLink,
    resetPasswordError,
    forgotPasswordError,
    loadingForgotPassword,
  } = useResetPassword();
  const [resetLinkSent, setResetLinkSent] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>("");
  const [resendResetCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendResetCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendResetCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendResetCooldown]);

  const handleResendResetLink = () => {
    generateResetPasswordLink(
      resetEmail,
      () => setResendCooldown(30),
      () => setResendCooldown(30)
    );
  };

  const getHandleResendResetText = () => {
    if (resendResetCooldown > 0) return `Resend in ${resendResetCooldown}s`;
    if (loadingForgotPassword) return "Resending email...";
    return "Resend email";
  };

  return (
    <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
      <div className="w-full max-w-md">
        <Card>
          {resetLinkSent ? (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 dark:bg-primary-dark/10 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary dark:text-primary-dark" />
                </div>
                <CardTitle>Reset link sent</CardTitle>
                <CardDescription>
                  If an account exists for{" "}
                  <span className="text-foreground dark:text-foreground-dark">
                    {resetEmail}
                  </span>
                  , you'll get a password reset link shortly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {resetPasswordError && (
                  <div className="px-6">
                    <FormErrors
                      errorTitle="Reset Failed"
                      errorMessage="Error: Something went wrong, Please try again!"
                    />
                  </div>
                )}
                <Button
                  onClick={handleResendResetLink}
                  disabled={resendResetCooldown > 0 || loadingForgotPassword}
                  variant="outline"
                  className={`w-full ${
                    loadingForgotPassword && "disabled:opacity-100"
                  }`}
                >
                  {getHandleResendResetText()}
                </Button>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring dark:focus-visible:border-ring-dark focus-visible:ring-ring/50 dark:focus-visible:ring-ring-dark/50 focus-visible:ring-[3px] text-primary dark:text-primary-dark underline-offset-4 h-9 py-2 has-[>svg]:px-3 px-0 text-sm"
                  aria-label="Back to login"
                >
                  Back to login
                </Link>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Reset your password</CardTitle>
                <CardDescription>
                  Enter your email and we'll send you a password reset link.
                </CardDescription>
              </CardHeader>
              {forgotPasswordError && (
                <div className="px-6">
                  <FormErrors
                    errorTitle="Reset Failed"
                    errorMessage="Error: Something went wrong, Please try again!"
                  />
                </div>
              )}
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={EmailSchema}
                onSubmit={({ email }, { setSubmitting }) => {
                  generateResetPasswordLink(
                    email,
                    () => {
                      setSubmitting(false);
                      setResetLinkSent(true);
                      setResetEmail(email);
                    },
                    () => setSubmitting(false)
                  );
                }}
              >
                {({ isSubmitting, isValid }) => (
                  <Form className="space-y-4 px-6 last:pb-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <TextField
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        id="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-sm text-destructive dark:text-destructive-dark"
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col gap-2 pb-6">
                      <Button
                        type="submit"
                        className={`w-full ${
                          isSubmitting && "disabled:opacity-100"
                        }`}
                        disabled={isSubmitting || !isValid}
                      >
                        {isSubmitting ? "Sending..." : "Send reset link"}
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
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
