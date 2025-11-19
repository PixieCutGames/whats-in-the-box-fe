import { PropsWithChildren } from "react";
import Dialog from "./Dialog/Dialog";
import DialogHeader from "./Dialog/DialogHeader";
import DialogContent from "./Dialog/DialogContent";
import DialogTitle from "./Dialog/DialogTitle";

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
    <Dialog isOpen={isOpen} onClose={onCancel}>
      {/* PANEL CONTAINER */}
      <DialogContent>
        <DialogHeader onClose={onCancel}>
          {/* TITLE */}
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
