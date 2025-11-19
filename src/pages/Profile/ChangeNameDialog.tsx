import { ErrorMessage, Field, Form, Formik } from "formik";
import { AlertCircle } from "lucide-react";
import * as Yup from "yup";
import useUser from "../../shared/hooks/useUser";
import DialogTitle from "../../shared/components/ui/Dialog/DialogTitle";
import DialogHeader from "../../shared/components/ui/Dialog/DialogHeader";
import DialogContent from "../../shared/components/ui/Dialog/DialogContent";
import Dialog from "../../shared/components/ui/Dialog/Dialog";

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
          {({ isSubmitting, errors, touched, isValid }) => (
            <Form className="space-y-4">
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`lg:hidden w-full px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors disabled:pointer-events-none ${
                  !isValid && "opacity-50"
                }`}
              >
                {isSubmitting ? "Saving" : "Save Changes"}
              </button>
              <div className="lg:flex flex-row justify-end gap-2 hidden">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
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
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {!!updateProfileError && (
          <div
            role="alert"
            className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
          >
            <AlertCircle className="size-4" />
            <div className="text-destructive/90 text-sm leading-relaxed ml-5">
              Error: {updateProfileError.message}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ChangeNameDialog;
