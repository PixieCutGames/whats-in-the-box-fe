import * as Yup from "yup";
import useUser from "../hooks/useUser";
import { ErrorMessage, Form, Formik } from "formik";
import PasswordInput from "./form/PasswordInput";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm password is required"),
});

type ChangePasswordFormProps = {
  onClose?: () => void;
};
function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const { changePassword, changePasswordError, refetchUser } = useUser();
  console.log({ changePasswordError });

  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={({ currentPassword, newPassword }, { setSubmitting }) => {
          changePassword(
            { currentPassword, newPassword },
            () => {
              refetchUser();
              if (onClose) onClose();
              else navigate(`/profile`);
            },
            () => setSubmitting(false)
          );
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-4">
            {/* TODO: add submmitting guard */}
            {/* <FormSubmittingGuard isSubmitting={isSubmitting} /> */}
            {/* Current Password */}
            <div className="space-y-2">
              <label
                htmlFor="currentPassword"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
              >
                Current password
              </label>
              <PasswordInput
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter current password"
              />
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-sm text-destructive"
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
              >
                New password
              </label>
              <PasswordInput
                name="newPassword"
                id="newPassword"
                placeholder="Enter new password"
              />
              <ErrorMessage
                name="newPassword"
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
                placeholder="Confirm new password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-sm text-destructive"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`lg:hidden w-full px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors disabled:pointer-events-none ${
                !isValid && "opacity-50"
              }`}
            >
              {isSubmitting ? "Changing Password..." : "Change Password"}
            </button>
            <div className="lg:flex flex-row justify-end gap-2 hidden">
              <button
                type="button"
                onClick={() => {
                  if (onClose) onClose();
                }}
                className="px-6 py-2 border border-border hover:bg-background-accent text-text-primary rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`px-6 py-2 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors disabled:pointer-events-none ${
                  !isValid && "opacity-50"
                }`}
              >
                {isSubmitting ? "Changing Password..." : "Change Password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {!!changePasswordError && (
        <div
          role="alert"
          className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
        >
          <AlertCircle className="size-4" />
          <div className="text-destructive/90 text-sm leading-relaxed ml-5">
            Error: {changePasswordError.message}
          </div>
        </div>
      )}
    </>
  );
}

export default ChangePasswordForm;
