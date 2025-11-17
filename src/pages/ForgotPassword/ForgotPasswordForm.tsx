import { ErrorMessage, Field, Form, Formik } from "formik";
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
import { AlertCircle, Mail } from "lucide-react";
import { useEffect, useState } from "react";

// Validation schema using Yup
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address!")
    .required("Email is required!"),
});

function ForgotPasswordForm() {
  const {
    generateResetPasswordLink,
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
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Reset link sent</CardTitle>
                <CardDescription>
                  If an account exists for{" "}
                  <span className="text-foreground">{resetEmail}</span>, you'll
                  get a password reset link shortly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
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
                  className="flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-primary underline-offset-4 h-9 py-2 has-[>svg]:px-3 px-0 text-sm"
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
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={EmailSchema}
                onSubmit={({ email }, { setSubmitting }) => {
                  console.log(email, setSubmitting);
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
                {({ isSubmitting, errors, touched, isValid }) => (
                  <Form className="space-y-4 px-6 last:pb-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        id="email"
                        className={`placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
           ${
             errors.email && touched.email
               ? "ring-destructive/20 dark:ring-destructive/40 border-destructive"
               : "border-input"
           } `}
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-sm text-destructive"
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
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-primary underline-offset-4 h-9 py-2 has-[>svg]:px-3 px-0 text-sm"
                        aria-label="Back to login"
                      >
                        Back to login
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
              {!!forgotPasswordError && (
                <div
                  role="alert"
                  className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
                >
                  <AlertCircle className="size-4" />
                  <div className="text-destructive/90 text-sm leading-relaxed ml-5">
                    Error: Something went wrong, Please try again!
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
