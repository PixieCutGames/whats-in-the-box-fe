import { PropsWithChildren } from "react";
import Dialog from "./Dialog/Dialog";
import DialogHeader from "./Dialog/DialogHeader";
import DialogContent from "./Dialog/DialogContent";
import DialogTitle from "./Dialog/DialogTitle";
import { Button } from "./Button";

type ConfirmationDialogProps = {
  title: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  loading?: boolean;
  loadingText?: string;
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
  loading,
  loadingText,
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
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {cancelText ?? "Cancel"}
          </Button>
          <Button
            variant={isDanger ? "destructive" : "default"}
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? loadingText ?? "Processing..." : confirmText ?? "OK"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
