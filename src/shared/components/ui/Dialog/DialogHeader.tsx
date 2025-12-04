import { XIcon } from "lucide-react";

type DialogHeaderProps = {
  onClose: () => void;
};
function DialogHeader({
  children,
  onClose,
}: React.PropsWithChildren<DialogHeaderProps>) {
  return (
    <div className="sm:flex sm:justify-between sm:gap-2">
      {children}
      <button
        onClick={onClose}
        className="text-foreground dark:text-foreground-dark rounded-xs opacity-70 transition-opacity hover:opacity-100 ring-offset-background dark:ring-offset-background-dark focus:ring-ring dark:focus:ring-ring-dark focus:ring-2 focus:ring-offset-2 focus:outline-hidden hidden sm:block"
      >
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}

export default DialogHeader;
