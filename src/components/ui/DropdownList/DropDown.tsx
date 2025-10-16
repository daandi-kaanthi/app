// components/ui/DropdownList.tsx
import React from "react";

interface DropdownListProps<T> {
  items: T[];
  activeIndex: number;
  renderItem: (item: T, isActive: boolean) => React.ReactNode;
  onItemClick: (item: T, index: number) => void;
  onItemHover?: (index: number) => void;
  className?: string;
}

export function DropdownList<T>({
  items,
  activeIndex,
  renderItem,
  onItemClick,
  onItemHover,
  className = "",
}: DropdownListProps<T>) {
  return (
    <ul
      className={`absolute mt-2 w-full rounded-lg shadow-lg overflow-y-auto max-h-60 bg-white text-black dark:bg-gray-800 dark:text-white scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-md ${className}`}
    >
      {items.map((item, idx) => (
        <li
          key={idx}
          className={`px-4 py-2 cursor-pointer transition-colors duration-150 ${
            idx === activeIndex
              ? "bg-gray-100 dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onMouseEnter={() => onItemHover?.(idx)}
          onMouseLeave={() => onItemHover?.(-1)}
          onClick={() => onItemClick(item, idx)}
        >
          {renderItem(item, idx === activeIndex)}
        </li>
      ))}
    </ul>
  );
}
