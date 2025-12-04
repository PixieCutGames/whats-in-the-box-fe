import { MenuItem } from "@headlessui/react";
import { CheckIcon } from "lucide-react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../../../lib/cn";
type MenuItemButtonProps = {
  selected: boolean;
};
function MenuItemButton({
  children,
  className,
  selected,
  ...props
}: PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> &
  MenuItemButtonProps) {
  return (
    <MenuItem>
      <button
        {...props}
        className={cn(
          "focus:bg-accent dark:focus:bg-input/10 focus:text-accent-foreground dark:focus:text-accent-dark-foreground hover:bg-accent dark:hover:bg-input/10 hover:text-accent-foreground dark:hover:text-accent-dark-foreground relative w-full cursor-default rounded-sm py-1.5 px-2 text-sm outline-hidden select-none flex items-center justify-between gap-2",
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
