import { Star } from "lucide-react";
import { Container } from "../../types";
import { cn } from "../../lib/cn";
import useContainerActions from "../hooks/useContainerActions";

type PinIconProps = {
  container: Container;
  className?: string;
  size?: "sm" | "lg";
};
function PinIcon({ container, className, size = "sm" }: PinIconProps) {
  const { pinContainer, unpinContainer } = useContainerActions();
  const togglePin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(id);
    if (container.pinned) {
      unpinContainer(id);
    } else {
      pinContainer(id);
    }
  };
  return (
    <button
      onClick={(e) => togglePin(e, container.id)}
      className={cn(
        "group p-2 rounded-lg hover:bg-background-surface dark:hover:bg-background-dark-surface transition-colors z-10 backdrop-blur-sm",
        className
      )}
      aria-label={container.pinned ? "Unstar box" : "Star box"}
    >
      <Star
        className={cn(
          "transition-colors",
          container.pinned
            ? "fill-yellow-500 text-yellow-500"
            : "text-text-secondary group-hover:text-yellow-500",
          size === "sm" ? "size-4" : "size-5"
        )}
      />
    </button>
  );
}

export default PinIcon;
