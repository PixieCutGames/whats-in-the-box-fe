import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

function useDarkMode() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage(`prefers-dark`, prefersDark);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return { isDark, setIsDark };
}

export default useDarkMode;
