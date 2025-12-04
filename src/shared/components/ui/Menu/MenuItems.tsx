import { MenuItems as HeadlessMenuItems } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { cn } from "../../../../lib/cn";

type MenuItemsProps = {
  anchor?: "bottom" | "bottom end";
  className?: string;
};
function MenuItems({
  children,
  className,
  anchor,
}: PropsWithChildren & MenuItemsProps) {
  return (
    <HeadlessMenuItems
      anchor={anchor ?? "bottom"}
      className={cn(
        "bg-popover dark:bg-popover-dark text-popover-foreground dark:text-popover-dark-foreground border border-border dark:border-border-dark relative z-50 mt-1 p-1 w-(--button-width) overflow-x-hidden overflow-y-auto rounded-md shadow-md",
        className
      )}
    >
      {children}
    </HeadlessMenuItems>
  );
}

export default MenuItems;
