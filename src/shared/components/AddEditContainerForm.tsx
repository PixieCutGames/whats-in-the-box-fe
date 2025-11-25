import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useContainerActions from "../hooks/useContainerActions";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ContainerFormValues } from "../../types";
import ImageUpload from "./form/ImageUpload";

// Validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Box name is required!"),
  description: Yup.string(),
  location: Yup.string(),
  imageId: Yup.string().nullable(),
});

type AddEditContainerFormProps = {
  onClose?: (refetch?: boolean) => void;
  details?: ContainerFormValues;
};
function AddEditContainerForm({ details, onClose }: AddEditContainerFormProps) {
  const navigate = useNavigate();
  const {
    newContainerError,
    createNewContainer,
    editContainerError,
    editContainer,
  } = useContainerActions();
  const [initialValues] = useState<ContainerFormValues>(
    details ?? {
      name: "",
      description: "",
      location: "",
      id: "",
      imageId: null,
    }
  );
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [submitValues] = useState({
    loading: details ? "Saving Changes..." : "Creating Box...",
    normal: details ? "Save Changes" : "Create Box",
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(
          { name, description, location, imageId },
          { setSubmitting }
        ) => {
          setSubmitting(true);
          if (details) {
            editContainer(
              { id: details.id, name, description, location, imageId },
              (data) => {
                if (onClose) onClose(true);
                else navigate(`/box/${data.container.id}`);
              },
              () => setSubmitting(false)
            );
          } else {
            createNewContainer(
              { name, description, location, imageId },
              (data) =>
                navigate(`/box/${data.container.id}`, { replace: true }),
              () => setSubmitting(false)
            );
          }
        }}
      >
        {({ isSubmitting, errors, touched, isValid }) => (
          <Form className="space-y-6">
            {/* Photo upload */}
            <div className="space-y-2">
              <ImageUpload
                id="imageId"
                name="imageId"
                imageUrl={details?.imageUrl}
                setImageisLoading={setImageUploading}
              />
              <ErrorMessage
                name="imageId"
                component="p"
                className="text-sm text-destructive"
              />
            </div>
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
              >
                Box Name
              </label>
              <Field
                name="name"
                placeholder="Enter box name"
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

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
              >
                Description (optional)
              </label>
              <Field
                name="description"
                placeholder="Enter description"
                id="description"
                as="textarea"
                className={`placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 min-h-16 text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
           ${
             errors.description && touched.description
               ? "ring-destructive/20 dark:ring-destructive/40 border-destructive"
               : "border-input"
           } `}
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-sm text-destructive"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
              >
                Location (optional)
              </label>
              <Field
                name="location"
                placeholder="Enter location (Kitchen, Bedroom..etc)"
                id="location"
                className={`placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-base bg-input-background transition-[color,box-shadow] outline-none  disabled:pointer-events-none disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
           ${
             errors.location && touched.location
               ? "ring-destructive/20 dark:ring-destructive/40 border-destructive"
               : "border-input"
           } `}
              />
              <ErrorMessage
                name="location"
                component="p"
                className="text-sm text-destructive"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid || imageUploading}
              className={`lg:hidden w-full px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors disabled:pointer-events-none ${
                (!isValid || imageUploading) && "opacity-50"
              }`}
            >
              {isSubmitting ? submitValues.loading : submitValues.normal}
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
                disabled={isSubmitting || !isValid || imageUploading}
                className={`px-6 py-2 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors disabled:pointer-events-none ${
                  (!isValid || imageUploading) && "opacity-50"
                }`}
              >
                {isSubmitting ? submitValues.loading : submitValues.normal}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {!!newContainerError && (
        <div
          role="alert"
          className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
        >
          <AlertCircle className="size-4" />
          <div className="text-destructive/90 text-sm leading-relaxed ml-5">
            Error: {newContainerError.message}
          </div>
        </div>
      )}
      {!!editContainerError && (
        <div
          role="alert"
          className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
        >
          <AlertCircle className="size-4" />
          <div className="text-destructive/90 text-sm leading-relaxed ml-5">
            Error: {editContainerError.message}
          </div>
        </div>
      )}
    </>
  );
}

export default AddEditContainerForm;
