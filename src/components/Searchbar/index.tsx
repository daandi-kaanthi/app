import React, { forwardRef } from "react";
import { X, Search } from "lucide-react";

interface SearchbarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onClear: () => void;
  placeholder?: string;
}

export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  ({ value, onClear, placeholder = "", ...props }, ref) => {
    return (
      <div className="relative flex items-center rounded-lg shadow-lg bg-white dark:bg-black/40 z-20">
        <Search
          className="absolute left-3 pointer-events-none text-black dark:text-white z-20"
          size={20}
        />

        <input
          ref={ref}
          name="search"
          value={value}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 rounded-lg focus:outline-none bg-white text-black dark:bg-black/20 dark:text-white"
          {...props}
        />

        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-200 focus:outline-none"
          >
            <X size={18} />
          </button>
        )}
      </div>
    );
  }
);

Searchbar.displayName = "Searchbar";
