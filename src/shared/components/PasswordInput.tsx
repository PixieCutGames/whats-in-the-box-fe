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
        className={`placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 pr-10 text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:pointer-events-none disabled:opacity-50 md:text-sm ${
          error && touched
            ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
            : "border-input"
        } px-4.5 py-2.5 rounded-lg text-gray-600 min-h-12 `}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
