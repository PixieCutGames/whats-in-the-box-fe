import { MenuItems as HeadlessMenuItems } from "@headlessui/react";
import { PropsWithChildren } from "react";

function MenuItems({ children }: PropsWithChildren) {
  return (
    <HeadlessMenuItems
      anchor="bottom"
      className="bg-popover dark:bg-popover-dark text-popover-foreground dark:text-popover-dark-foreground border border-border dark:border-border-dark relative z-50 mt-1 p-1 w-(--button-width) overflow-x-hidden overflow-y-auto rounded-md shadow-md"
    >
      {children}
    </HeadlessMenuItems>
  );
}

export default MenuItems;
