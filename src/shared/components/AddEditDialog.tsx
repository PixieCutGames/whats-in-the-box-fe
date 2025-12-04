import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import AddEditContainerForm from "./AddEditContainerForm";
import { ContainerFormValues, ItemFormValues } from "../../types";
import AddEditItemForm from "./AddEditItemForm";

type AddEditDialogProps = {
  isOpen: boolean;
  onClose: (refetch?: boolean) => void;
  details?: ContainerFormValues;
  itemDetails?: ItemFormValues;
  type: "container" | "item";
  containerId?: string;
};
function AddEditDialog({
  details,
  type,
  containerId,
  itemDetails,
  isOpen,
  onClose,
}: AddEditDialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* BACKDROP */}
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>
        {/* PANEL CONTAINER */}
        <div className="fixed inset-0 flex items-end justify-center p-4 sm:items-center">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-full opacity-0"
          >
            <DialogPanel className="bg-background-surface dark:bg-background-dark-surface border-border dark:border-border-dark max-w-xl max-h-[90vh] overflow-y-auto w-full rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg gap-4 flex flex-col">
              <div className="flex justify-between gap-2">
                {/* TITLE */}
                <DialogTitle className="text-lg leading-none font-semibold text-text-primary dark:text-text-dark-primary">
                  Create New {type === "container" ? "Box" : "Item"}
                </DialogTitle>
                <button
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  className="text-foreground dark:text-foreground-dark rounded-xs opacity-70 transition-opacity hover:opacity-100 ring-offset-background dark:ring-offset-background-dark focus:ring-ring dark:focus:ring-ring-dark focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              {type === "container" && (
                <AddEditContainerForm onClose={onClose} details={details} />
              )}
              {type === "item" && (
                <AddEditItemForm
                  onClose={onClose}
                  details={itemDetails}
                  containerId={containerId}
                />
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AddEditDialog;
