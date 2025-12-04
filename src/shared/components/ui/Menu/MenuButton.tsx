import { MenuButton as HeadlessMenuButton } from "@headlessui/react";
import { PropsWithChildren } from "react";

function MenuButton({ children }: PropsWithChildren) {
  return (
    <HeadlessMenuButton className="w-24 lg:w-32 text-text-primary dark:text-text-dark-primary bg-background-surface dark:bg-background-dark-surface dark:hover:bg-background-dark-surface/50 border-border dark:border-border-dark data-placeholder:text-muted-foreground dark:data-placeholder:text-muted-dark-foreground focus-visible:border-ring dark:focus-visible:border-ring-dark focus-visible:ring-ring/50 dark:focus-visible:ring-ring-dark/50 flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2">
      {children}
    </HeadlessMenuButton>
  );
}

export default MenuButton;
