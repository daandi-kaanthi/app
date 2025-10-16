import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-black/70 rounded-full shadow-md hover:scale-105 transition-transform"
      title="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="text-black w-5 h-5" />
      ) : (
        <Sun className="text-white w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
