import * as Yup from "yup";
import useUser from "../hooks/useUser";
import { ErrorMessage, Form, Formik } from "formik";
import PasswordInput from "./form/PasswordInput";
import { useNavigate } from "react-router-dom";
import FormErrors from "./form/FormErrors";
import Label from "./form/Label";
import { Button } from "./ui/Button";

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

  const navigate = useNavigate();
  return (
    <>
      {changePasswordError && (
        <FormErrors
          errorTitle="Failed to Change password"
          errorMessage={changePasswordError.message}
        />
      )}
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
              <Label htmlFor="currentPassword">Current password</Label>
              <PasswordInput
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter current password"
              />
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-sm text-destructive dark:text-destructive-dark"
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <PasswordInput
                name="newPassword"
                id="newPassword"
                placeholder="Enter new password"
              />
              <ErrorMessage
                name="newPassword"
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
                placeholder="Confirm new password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-sm text-destructive dark:text-destructive-dark"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className={`lg:hidden w-full ${
                !isValid ? "opacity-50" : "opacity-100"
              }`}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "Changing Password..." : "Change Password"}
            </Button>
            <div className="lg:flex flex-row justify-end gap-2 hidden">
              <Button
                variant="outline"
                onClick={() => {
                  if (onClose) onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`${!isValid ? "opacity-50" : "opacity-100"}`}
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? "Changing Password..." : "Change Password"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ChangePasswordForm;
