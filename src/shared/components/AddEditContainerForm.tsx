import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import useContainerActions from "../hooks/useContainerActions";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ContainerFormValues } from "../../types";
import ImageUpload from "./form/ImageUpload";
import Label from "./form/Label";
import TextField from "./form/TextField";
import FormErrors from "./form/FormErrors";
import { Button } from "./ui/Button";

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
      {newContainerError && (
        <FormErrors
          errorTitle="Failed to Create Box"
          errorMessage={newContainerError.message}
        />
      )}
      {editContainerError && (
        <FormErrors
          errorTitle="Failed to Edit Box"
          errorMessage={editContainerError.message}
        />
      )}
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
                navigate(`/box/${data.container.id}`, { replace: !onClose }),
              () => setSubmitting(false)
            );
          }
        }}
      >
        {({ isSubmitting, isValid }) => (
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
                className="text-sm text-destructive dark:text-destructive-dark"
              />
            </div>
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Box Name</Label>
              <TextField name="name" placeholder="Enter box name" id="name" />
              <ErrorMessage
                name="name"
                component="p"
                className="text-sm text-destructive dark:text-destructive-dark"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <TextField
                name="description"
                placeholder="Enter description"
                id="description"
                as="textarea"
                className="min-h-16"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-sm text-destructive dark:text-destructive-dark"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location (optional)</Label>
              <TextField
                name="location"
                placeholder="Enter location (Kitchen, Bedroom..etc)"
                id="location"
              />
              <ErrorMessage
                name="location"
                component="p"
                className="text-sm text-destructive dark:text-destructive-dark"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className={`lg:hidden w-full ${
                !isValid || imageUploading ? "opacity-50" : "opacity-100"
              }`}
              disabled={isSubmitting || !isValid || imageUploading}
            >
              {isSubmitting ? submitValues.loading : submitValues.normal}
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
                className={`${
                  !isValid || imageUploading ? "opacity-50" : "opacity-100"
                }`}
                disabled={isSubmitting || !isValid || imageUploading}
              >
                {isSubmitting ? submitValues.loading : submitValues.normal}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddEditContainerForm;
