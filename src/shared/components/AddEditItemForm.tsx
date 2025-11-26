import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ItemFormValues } from "../../types";
import ImageUpload from "./form/ImageUpload";
import useItemActions from "../hooks/useItemActions";
import useContainers from "../hooks/useContainers";
import AutoComplete from "./form/AutoComplete";

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
              (data) => navigate(`/item/${data.item.id}`, { replace: true }),
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
                Item Name
              </label>
              <Field
                name="name"
                placeholder="Enter item name"
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

            {/* Container */}
            <div className="space-y-2">
              <label
                htmlFor="containerId"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
              >
                Box
              </label>
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
                className="text-sm text-destructive"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
              >
                Quantity
              </label>
              <Field
                name="quantity"
                type="number"
                min={1}
                id="quantity"
                className={`placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
           ${
             errors.quantity && touched.quantity
               ? "ring-destructive/20 dark:ring-destructive/40 border-destructive"
               : "border-input"
           } `}
              />
              <ErrorMessage
                name="quantity"
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
      {!!newItemError && (
        <div
          role="alert"
          className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
        >
          <AlertCircle className="size-4" />
          <div className="text-destructive/90 text-sm leading-relaxed ml-5">
            Error: {newItemError.message}
          </div>
        </div>
      )}
      {!!editItemError && (
        <div
          role="alert"
          className="relative w-full rounded-lg border-t border-t-border px-4 py-3 text-sm flex items-center translate-y-0.5 text-destructive [&amp;&gt;svg]:text-current mt-4"
        >
          <AlertCircle className="size-4" />
          <div className="text-destructive/90 text-sm leading-relaxed ml-5">
            Error: {editItemError.message}
          </div>
        </div>
      )}
    </>
  );
}

export default AddEditItemForm;
