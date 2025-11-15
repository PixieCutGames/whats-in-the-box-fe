import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/components/Card";
import * as Yup from "yup";
import PasswordInput from "../../shared/components/PasswordInput";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from "react-router";
import { AlertCircle } from "lucide-react";

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
                className={`placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:pointer-events-none disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
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
                className={`placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:pointer-events-none disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
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
            <div className="flex items-center pb-6">
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
