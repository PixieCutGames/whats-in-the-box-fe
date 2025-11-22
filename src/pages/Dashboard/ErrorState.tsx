import { CircleX, RefreshCw } from "lucide-react";

type ErrorStateProps = {
  refetch: () => void;
};
function ErrorState({ refetch }: ErrorStateProps) {
  return (
    <div
      data-error
      className="flex flex-col items-center justify-center bg-background-surface border border-border rounded-lg p-6"
    >
      <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <CircleX className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-text-primary mb-2">Couldn’t load data.</h2>
      <p className="text-text-secondary text-center mb-6 max-w-mdd">
        Please try again.
      </p>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
        onClick={refetch}
      >
        <RefreshCw className="h-4 w-4" />
        Retry
      </button>
    </div>
  );
}

export default ErrorState;
