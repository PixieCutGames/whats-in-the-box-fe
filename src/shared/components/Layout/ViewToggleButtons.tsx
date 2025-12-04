import { Grid3x3, List } from "lucide-react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ViewToggleButtonProps = {
  selected: boolean;
};
const ViewToggleButton = ({
  selected,
  children,
  ...props
}: ViewToggleButtonProps &
  PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`p-2 rounded-md transition-colors ${
        selected
          ? "bg-primary-surface dark:bg-primary-dark-foreground/10 text-primary dark:text-primary-dark-foreground"
          : "text-text-secondary dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-text-dark-primary hover:bg-background-accent dark:hover:bg-background-accent/10"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

type ViewToggleButtonsProps = {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
};

function ViewToggleButtons({ viewMode, setViewMode }: ViewToggleButtonsProps) {
  return (
    <div className="flex items-center gap-1 bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg p-1">
      <ViewToggleButton
        selected={viewMode === "grid"}
        onClick={() => setViewMode("grid")}
        aria-label="Grid view"
      >
        <Grid3x3 className="h-4 w-4" />
      </ViewToggleButton>
      <ViewToggleButton
        selected={viewMode === "list"}
        onClick={() => setViewMode("list")}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </ViewToggleButton>
    </div>
  );
}

export default ViewToggleButtons;
