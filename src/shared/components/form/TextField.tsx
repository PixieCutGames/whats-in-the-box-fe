import { Field, FieldHookConfig, useField } from "formik";
import { ClassAttributes, InputHTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

function TextField(
  props: InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement> &
    FieldHookConfig<string>
) {
  const [_, { error, touched }] = useField(props.name);
  return (
    <Field
      {...props}
      className={cn(
        `placeholder:text-muted-foreground dark:placeholder:text-muted-dark-foreground selection:bg-primary dark:selection:bg-primary-dark selection:text-primary-foreground dark:selection:text-primary-dark-foreground dark:bg-input/5 bg-input-background flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-text-primary dark:text-text-dark-primary text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-50 md:text-sm focus-visible:border-ring dark:focus-visible:border-ring-dark focus-visible:ring-ring/50 dark:focus-visible:ring-ring-dark/50 focus-visible:ring-[3px]`,
        error && touched
          ? "border-destructive dark:border-destructive-dark focus-visible:border-destructive dark:focus-visible:border-destructive-dark focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive-dark/20"
          : "border-border dark:border-border-dark focus-visible:border-ring dark:focus-visible:border-ring-dark focus-visible:ring-ring/50 dark:focus-visible:ring-ring-dark/50",
        props.className
      )}
    />
  );
}

export default TextField;
