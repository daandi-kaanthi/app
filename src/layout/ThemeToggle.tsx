import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 dark:bg-black/40 rounded-full shadow-md hover:scale-105 transition-transform"
      title="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="text-black " />
      ) : (
        <Sun className="text-white " />
      )}
    </button>
  );
};

export default ThemeToggle;
