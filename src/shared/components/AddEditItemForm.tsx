import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ItemFormValues } from "../../types";
import ImageUpload from "./form/ImageUpload";
import useItemActions from "../hooks/useItemActions";
import useContainers from "../hooks/useContainers";
import AutoComplete from "./form/AutoComplete";
import FormErrors from "./form/FormErrors";
import Label from "./form/Label";
import TextField from "./form/TextField";
import { Button } from "./ui/Button";

// Validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Item name is required!"),
  description: Yup.string(),
  quantity: Yup.number().min(1).required(),
  imageId: Yup.string().nullable(),
  containerId: Yup.string().min(3).required("Box is required!"),
});

type AddEditItemFormProps = {
  onClose?: (refetch?: boolean) => void;
  details?: ItemFormValues;
  containerId?: string;
};
function AddEditItemForm({
  details,
  containerId,
  onClose,
}: AddEditItemFormProps) {
  const navigate = useNavigate();
  const { newItemError, createNewItem, editItemError, editItem } =
    useItemActions();
  const { containersDetails } = useContainers();

  const [initialValues] = useState<ItemFormValues>(
    details ?? {
      name: "",
      description: "",
      id: "",
      imageId: null,
      containerId: containerId ?? "",
      quantity: 1,
    }
  );
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [submitValues] = useState({
    loading: details ? "Saving Changes..." : "Creating Item...",
    normal: details ? "Save Changes" : "Create Item",
  });
  return (
    <>
      {newItemError && (
        <FormErrors
          errorTitle="Failed to Create Item"
          errorMessage={newItemError.message}
        />
      )}
      {editItemError && (
        <FormErrors
          errorTitle="Failed to Edit Item"
          errorMessage={editItemError.message}
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(
          { name, description, quantity, imageId, containerId },
          { setSubmitting }
        ) => {
          setSubmitting(true);
          if (details) {
            editItem(
              {
                id: details.id,
                name,
                description,
                quantity,
                imageId,
                containerId,
              },
              (data) => {
                if (onClose) onClose(true);
                else navigate(`/item/${data.item.id}`);
              },
              () => setSubmitting(false)
            );
          } else {
            createNewItem(
              { name, description, quantity, imageId, containerId },
              (data) =>
                navigate(`/item/${data.item.id}`, { replace: !onClose }),
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
              <Label htmlFor="name">Item Name</Label>
              <TextField name="name" placeholder="Enter item name" id="name" />
              <ErrorMessage
                name="name"
                component="p"
                className="text-sm text-destructive dark:text-destructive-dark"
              />
            </div>

            {/* Container */}
            <div className="space-y-2">
              <Label htmlFor="containerId">Box</Label>
              <AutoComplete
                name="containerId"
                id="containerId"
                disabled={!!containerId}
                options={
                  containersDetails?.containers.map((c) => ({
                    value: c.id,
                    label: c.name,
                  })) ?? []
                }
              />
              <ErrorMessage
                name="containerId"
                component="p"
                className="text-sm text-destructive dark:text-destructive-dark"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="description">Quantity</Label>
              <TextField name="quantity" type="number" min={1} id="quantity" />
              <ErrorMessage
                name="quantity"
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

export default AddEditItemForm;
