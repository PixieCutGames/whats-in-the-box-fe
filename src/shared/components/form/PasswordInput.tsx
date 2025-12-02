import { FieldHookConfig, useField } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { ClassAttributes, InputHTMLAttributes, useState } from "react";

function PasswordInput(
  props: InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement> &
    FieldHookConfig<string>
) {
  const [field, { error, touched }] = useField(props.name);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        {...field}
        {...props}
        type={showPassword ? "text" : "password"}
        className={`placeholder:text-muted-foreground dark:placeholder:text-muted-dark-foreground selection:bg-primary dark:selection:bg-primary-dark selection:text-primary-foreground dark:selection:text-primary-dark-foreground dark:bg-input/5 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 pr-10 text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-50 md:text-sm ${
          error && touched
            ? "border-destructive dark:border-destructive-dark focus-visible:border-destructive dark:focus-visible:border-destructive-dark focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive-dark/20"
            : "border-border dark:border-border-dark focus-visible:border-ring dark:focus-visible:border-ring-dark focus-visible:ring-ring/50 dark:focus-visible:ring-ring-dark/50"
        } px-3 py-2 rounded-md h-9 text-text-primary dark:text-text-dark-primary `}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-muted-dark-foreground hover:text-foreground dark:hover:text-foreground-dark transition-colors"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

export default PasswordInput;
