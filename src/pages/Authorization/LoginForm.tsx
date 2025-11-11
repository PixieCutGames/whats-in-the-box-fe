import { Checkbox } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import PasswordInput from "../../shared/components/PasswordInput";
import { AlertCircle, CheckIcon } from "lucide-react";
import Card from "./Card";

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address!")
    .required("Email is required!"),
  password: Yup.string().min(8).required("Password is required!"),
  rememberMe: Yup.boolean(),
});

function LoginForm() {
  return (
    <Card
      title="Welcome back"
      description="Enter your credentials to access your files"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={LoginSchema}
        onSubmit={({ email, password, rememberMe }, { setSubmitting }) => {
          console.log(email, password, rememberMe, setSubmitting);

          // signin(
          //   email,
          //   password,
          //   rememberMe,
          //   () => {
          //     router.push(`/account`);
          //   },
          //   (errors) => {
          //     setSubmitting(false);
          //     const errs: string[] = [];
          //     if (errors.userError) errs.push(errors.userError);
          //     if (errors.apolloError) {
          //       console.error(errors.apolloError.message);
          //       // TODO: revise this message
          //       errs.push("Something went wrong please try again.");
          //     }
          //     setFormErrors(errs);
          //   }
          // );
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
          <Form className="space-y-4 px-6 last:pb-6">
            {/* <FormErrorsSection errors={formErrors} /> */}
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="you@example.com"
                id="email"
                className={`placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
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
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
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
            {/* TODO: add loading */}
            <div className="flex items-center pb-6">
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
      <div
        role="alert"
        className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
      >
        <AlertCircle className="size-4" />
        <div className="text-destructive/90 text-sm leading-relaxed ml-5">
          Error: invalid username or password
        </div>
      </div>
    </Card>
  );
}

export default LoginForm;
