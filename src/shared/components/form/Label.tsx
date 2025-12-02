import { LabelHTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

function Label({
  className,
  htmlFor,
  children,
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium text-text-primary dark:text-text-dark-primary select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50",
        className
      )}
    >
      {children}
    </label>
  );
}

export default Label;
