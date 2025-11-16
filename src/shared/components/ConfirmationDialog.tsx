import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import { Fragment, PropsWithChildren } from "react";

type ConfirmationDialogProps = {
  title: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
function ConfirmationDialog({
  children,
  title,
  confirmText,
  cancelText,
  isDanger,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps & PropsWithChildren) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
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
        <div className="fixed inset-0 flex justify-center p-4 items-center">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-full opacity-0"
          >
            <DialogPanel className="bg-background-surface border-border max-w-xl max-h-[90vh] overflow-y-auto w-full rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg gap-4 flex flex-col">
              <div className="sm:flex sm:justify-between sm:gap-2">
                {/* TITLE */}
                <DialogTitle className="text-lg leading-none font-semibold text-text-primary sm:text-start text-center">
                  {title}
                </DialogTitle>
                <button
                  onClick={onCancel}
                  className="text-foreground rounded-xs opacity-70 transition-opacity hover:opacity-100 ring-offset-background focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-hidden hidden sm:block"
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              {children}
              {/* FOOTER */}
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 border-border-default hover:bg-background-accent text-text-primary"
                  onClick={onCancel}
                >
                  {cancelText ?? "Cancel"}
                </button>
                <button
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-9 px-4 py-2 text-text-inverse ${
                    isDanger
                      ? "bg-error hover:bg-error-hover"
                      : "bg-primary hover:bg-primary-hover"
                  }`}
                  onClick={onConfirm}
                >
                  {confirmText ?? "OK"}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ConfirmationDialog;
