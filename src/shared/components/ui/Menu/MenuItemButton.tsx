import { MenuItem } from "@headlessui/react";
import { CheckIcon } from "lucide-react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../../../lib/cn";
type MenuItemButtonProps = {
  selected?: boolean;
  danger?: boolean;
};
function MenuItemButton({
  children,
  className,
  selected,
  danger,
  ...props
}: PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> &
  MenuItemButtonProps) {
  return (
    <MenuItem>
      <button
        {...props}
        className={cn(
          "focus:bg-accent dark:focus:bg-input/10 focus:text-accent-foreground dark:focus:text-accent-dark-foreground hover:bg-accent dark:hover:bg-input/10 hover:text-accent-foreground dark:hover:text-accent-dark-foreground relative w-full rounded-sm py-1.5 px-2 text-sm outline-hidden select-none flex items-center justify-between gap-2",
          danger &&
            "text-destructive dark:text-destructive-dark focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive dark:focus:text-destructive-dark hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive dark:hover:text-destructive-dark",
          className
        )}
      >
        {children}
        {selected && <CheckIcon className="size-4" />}
      </button>
    </MenuItem>
  );
}

export default MenuItemButton;
