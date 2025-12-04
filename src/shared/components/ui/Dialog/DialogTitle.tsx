import { DialogTitle as HeadlessDialogTitle } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { cn } from "../../../../lib/cn";

type DialogTitleProps = {
  className?: string;
};
function DialogTitle({
  children,
  className,
}: PropsWithChildren & DialogTitleProps) {
  return (
    <HeadlessDialogTitle
      className={cn(
        "text-lg leading-none font-semibold text-text-primary dark:text-text-dark-primary sm:text-start text-center",
        className
      )}
    >
      {children}
    </HeadlessDialogTitle>
  );
}

export default DialogTitle;
