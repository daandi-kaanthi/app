import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", ...props }, ref) => {
    let baseClasses =
      "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";

    let variantClasses = "";
    switch (variant) {
      case "primary":
        variantClasses =
          "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700";
        break;
      case "secondary":
        variantClasses =
          "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-600";
        break;
      case "ghost":
        variantClasses =
          "bg-transparent text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700";
        break;
    }

    return <button ref={ref} className={`${baseClasses} ${variantClasses} ${className}`} {...props} />;
  }
);

Button.displayName = "Button";
