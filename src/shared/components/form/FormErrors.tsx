import { AlertCircle } from "lucide-react";

type FormErrorsProps = {
  errorTitle: string;
  errorMessage: string;
};
function FormErrors({ errorTitle, errorMessage }: FormErrorsProps) {
  return (
    <div className="bg-destructive/5 dark:bg-destructive/5 border-l-4 border-destructive dark:border-destructive-dark rounded-md p-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-3.5 w-3.5 text-destructive dark:text-destructive-dark" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-destructive dark:text-destructive-dark mb-1">
            {errorTitle}
          </h4>
          <p className="text-sm text-destructive/80 dark:text-destructive-dark/80">
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormErrors;
