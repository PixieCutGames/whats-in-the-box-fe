import { Moon, Sun } from "lucide-react";
import useDarkMode from "../../hooks/useDarkMode";

function DarkModeButton() {
  const { isDark, setIsDark } = useDarkMode();
  const darkModeHandler = () => {
    setIsDark(!isDark);
    // document.body.classList.toggle("darc");
  };
  return (
    <button
      onClick={darkModeHandler}
      className="p-2 rounded-lg hover:bg-background-accent dark:hover:bg-background-accent/10 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-text-dark-primary" />
      ) : (
        <Moon className="h-5 w-5 text-text-primary" />
      )}
    </button>
  );
}

export default DarkModeButton;
