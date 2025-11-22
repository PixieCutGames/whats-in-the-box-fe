import { CircleX, RefreshCw } from "lucide-react";

type ErrorStateProps = {
  refetch: () => void;
};
function ErrorState({ refetch }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <CircleX className="h-12 w-12 text-destructive" />
      </div>
      <h2 className="text-text-primary mb-2">Couldn’t load Items.</h2>
      <p className="text-text-secondary text-center mb-6 max-w-mdd">
        Please try again.
      </p>
      <button
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
        onClick={refetch}
      >
        <RefreshCw className="h-5 w-5" />
        Retry
      </button>
    </div>
  );
}

export default ErrorState;
