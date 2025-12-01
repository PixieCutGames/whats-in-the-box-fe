import { Checkbox } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import PasswordInput from "../../shared/components/form/PasswordInput";
import { AlertCircle, CheckIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/components/ui/Card";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { Button } from "../../shared/components/ui/Button";

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address!")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!"),
  rememberMe: Yup.boolean(),
});

function LoginForm() {
  const { login, loginError } = useAuth();
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your files
        </CardDescription>
      </CardHeader>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={LoginSchema}
        onSubmit={({ email, password, rememberMe }, { setSubmitting }) => {
          setSubmitting(true);
          login(
            email,
            password,
            rememberMe,
            () => navigate("/"),
            () => setSubmitting(false)
          );
        }}
      >
        {({
          isSubmitting,
          setFieldValue,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <Form className="space-y-4 px-6">
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

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={values.rememberMe}
                  onChange={(value) => setFieldValue("rememberMe", value)}
                  name="rememberMe"
                  value={values.rememberMe}
                  className="flex items-center justify-center group size-4 p-0 shrink-0 shadow-xs transition-shadow outline-none bg-input-background dark:bg-input/30 rounded-sm border border-border ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary data-focus:outline data-focus:border-ring data-focus:ring-ring/50 data-focus:ring-[3px]"
                >
                  <CheckIcon className="size-3.5 hidden group-data-checked:block" />
                </Checkbox>
                <label htmlFor="rememberMe" className="text-sm leading-none">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-primary underline-offset-4 h-9 py-2 has-[>svg]:px-3 px-0 text-sm"
                aria-label="forgot password?"
              >
                Forgot password?
              </Link>
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
                {isSubmitting ? "Signing In..." : "Sign In"}
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
      <div className={`px-6 flex gap-3 ${!loginError && "pb-6"}`}>
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
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => console.log("Apple login clicked")}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Apple
        </Button>
      </div>
      {!!loginError && (
        <div
          role="alert"
          className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
        >
          <AlertCircle className="size-4" />
          <div className="text-destructive/90 text-sm leading-relaxed ml-5">
            Error: Wrong username or password
          </div>
        </div>
      )}
    </Card>
  );
}

export default LoginForm;
