import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary dark:bg-primary-dark text-primary-foreground dark:text-primary-dark-foreground hover:bg-primary/90 dark:hover:bg-primary-dark/90",
        destructive:
          "bg-error dark:bg-error-dark text-text-inverse dark:text-primary-dark-foreground hover:bg-error/90 dark:hover:bg-error-dark/90 focus-visible:ring-error/20 dark:focus-visible:ring-error-dark/20",
        outline:
          "border border-border dark:border-border-dark bg-background dark:bg-input/5 text-foreground dark:text-foreground-dark hover:bg-accent dark:hover:bg-input/10 hover:text-accent-foreground dark:hover:text-accent-dark-foreground",
        secondary:
          "bg-secondary dark:bg-secondary-dark text-secondary-foreground dark:text-secondary-dark-foreground hover:bg-secondary/80 dark:hover:bg-secondary-dark/80",
        ghost:
          "hover:bg-accent dark:hover:bg-input/10 hover:text-accent-foreground dark:hover:text-accent-dark-foreground dark:hover:bg-accent/50 dark:hover:bg-accent-dark/50",
        link: "text-primary dark:text-primary-dark underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
