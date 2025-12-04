import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import useUser from "../../shared/hooks/useUser";
import DialogTitle from "../../shared/components/ui/Dialog/DialogTitle";
import DialogHeader from "../../shared/components/ui/Dialog/DialogHeader";
import DialogContent from "../../shared/components/ui/Dialog/DialogContent";
import Dialog from "../../shared/components/ui/Dialog/Dialog";
import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import FormErrors from "../../shared/components/form/FormErrors";
import { Button } from "../../shared/components/ui/Button";

// Validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Your name is required!"),
});

type ChangeNameDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};
function ChangeNameDialog({ isOpen, onClose }: ChangeNameDialogProps) {
  const { changeName, updateProfileError, refetchUser, userDetails } =
    useUser();
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      {/* PANEL CONTAINER */}
      <DialogContent>
        <DialogHeader onClose={onClose}>
          {/* TITLE */}
          <DialogTitle>Change your name</DialogTitle>
        </DialogHeader>
        {updateProfileError && (
          <FormErrors
            errorTitle="Failed to Update Profile"
            errorMessage={updateProfileError.message}
          />
        )}
        <Formik
          initialValues={{
            name: userDetails?.user.name ?? "",
          }}
          validationSchema={schema}
          onSubmit={({ name }, { setSubmitting }) => {
            changeName(
              name,
              () => {
                refetchUser();
                onClose();
              },
              () => setSubmitting(false)
            );
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <TextField name="name" placeholder="John Doe" id="name" />
                <ErrorMessage
                  name="name"
                  component="p"
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
                {isSubmitting ? "Saving" : "Save Changes"}
              </Button>
              <div className="lg:flex flex-row justify-end gap-2 hidden">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={`${!isValid ? "opacity-50" : "opacity-100"}`}
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeNameDialog;
