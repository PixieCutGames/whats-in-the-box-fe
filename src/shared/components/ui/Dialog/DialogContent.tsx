import { DialogPanel, TransitionChild } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { Fragment } from "react/jsx-runtime";
import { cn } from "../../../../lib/cn";

type DialogContentProps = {
  className?: string;
};
function DialogContent({
  children,
  className,
}: PropsWithChildren<DialogContentProps>) {
  return (
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
        <DialogPanel
          className={cn(
            "bg-background-surface border-border max-w-xl max-h-[90vh] overflow-y-auto w-full rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg gap-4 flex flex-col",
            className
          )}
        >
          {children}
        </DialogPanel>
      </TransitionChild>
    </div>
  );
}

export default DialogContent;
