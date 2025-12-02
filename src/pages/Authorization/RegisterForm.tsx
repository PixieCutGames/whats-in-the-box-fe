import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/components/ui/Card";
import * as Yup from "yup";
import PasswordInput from "../../shared/components/form/PasswordInput";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from "react-router";
import { AlertCircle } from "lucide-react";
import { Button } from "../../shared/components/ui/Button";

// Validation schema using Yup
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Your name is required!"),
  email: Yup.string()
    .email("Enter a valid email address!")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Password must be 8 charactes atleast!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match!")
    .required("Password is required!"),
});

function RegisterForm() {
  const { register, registerError } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Start sharing files securely in minutes
        </CardDescription>
      </CardHeader>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={({ email, password, name }, { setSubmitting }) => {
          register(
            name,
            email,
            password,
            () =>
              navigate("/verification", {
                state: { prevPath: location.pathname, email },
              }),
            () => setSubmitting(false)
          );
        }}
      >
        {({ isSubmitting, errors, touched, isValid }) => (
          <Form className="space-y-4 px-6 last:pb-6">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
              >
                Name
              </label>
              <Field
                name="name"
                placeholder="John Doe"
                id="name"
                className={`placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
           ${
             errors.name && touched.name
               ? "ring-destructive/20 dark:ring-destructive/40 border-destructive"
               : "border-input"
           } `}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-sm text-destructive"
              />
            </div>

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
            <div className="flex items-center">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 w-full ${
                  !isValid && "opacity-50"
                }`}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex items-center px-6">
        <hr className="w-100 m-0 text-border" />
        <span className="text-muted-foreground font-medium text-nowrap mx-6">
          or continue with
        </span>
        <hr className="w-100 m-0 text-border" />
      </div>
      <div className={`px-6 flex gap-3 ${!registerError && "pb-6"}`}>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() =>
            (window.location.href = `${
              import.meta.env.VITE_BASE_URL
            }/auth/google`)
          }
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
      </div>
      {!!registerError && (
        <div
          role="alert"
          className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
        >
          <AlertCircle className="size-4" />
          <div className="text-destructive/90 text-sm leading-relaxed ml-5">
            Error: {registerError.message}
          </div>
        </div>
      )}
    </Card>
  );
}

export default RegisterForm;
