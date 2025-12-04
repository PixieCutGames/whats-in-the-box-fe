import DialogContent from "../../shared/components/ui/Dialog/DialogContent";
import Dialog from "../../shared/components/ui/Dialog/Dialog";
import DialogHeader from "../../shared/components/ui/Dialog/DialogHeader";
import DialogTitle from "../../shared/components/ui/Dialog/DialogTitle";
import ChangePasswordForm from "../../shared/components/ChangePasswordForm";

interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      {/* PANEL CONTAINER */}
      <DialogContent>
        <DialogHeader onClose={onClose}>
          {/* TITLE */}
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground dark:text-muted-dark-foreground text-sm">
          Enter your current password and choose a new password.
        </p>
        <div className="mt-4">
          <ChangePasswordForm onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
