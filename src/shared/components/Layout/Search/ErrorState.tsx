import { CircleX, SearchIcon } from "lucide-react";
import { Button } from "../../ui/Button";

type ErrorStateProps = {
  refetch: () => void;
};
function ErrorState({ refetch }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-24 w-24 rounded-full bg-destructive/10 dark:bg-destructive-dark/10 flex items-center justify-center mb-6">
        <CircleX className="h-12 w-12 text-destructive dark:text-destructive-dark" />
      </div>
      <h2 className="text-text-primary dark:text-text-dark-primary mb-2">
        Couldn’t load results.
      </h2>
      <p className="text-text-secondary dark:text-text-dark-secondary text-center mb-6 max-w-mdd">
        Please try again.
      </p>
      <Button
        className="has-[>svg]:px-6 py-3 rounded-lg text-base h-auto hover:bg-primary-hover"
        onClick={refetch}
      >
        <SearchIcon className="h-5 w-5" />
        Retry search
      </Button>
    </div>
  );
}

export default ErrorState;
