import React from "react";
import { motion } from "framer-motion";
import { type FlattenedTravelPackage } from "../../../../redux/slices/Travel/TravelSlice";

interface AddOnListItemProps {
  trek: FlattenedTravelPackage;
  isSelected: boolean;
  onToggle: (trekId: string) => void;
}

export const AddOnListItem: React.FC<AddOnListItemProps> = ({
  trek,
  isSelected,
  onToggle,
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onToggle(trek.id)}
    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
      isSelected
        ? "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/30 border-2 border-blue-400 dark:border-blue-600 shadow-md"
        : "bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 border-2 border-transparent"
    }`}
  >
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
        isSelected ? "bg-blue-500" : "bg-gray-300 dark:bg-neutral-600"
      }`}
    >
      {isSelected ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      )}
    </div>
    <div className="flex-1 text-left">
      <p
        className={`font-semibold ${
          isSelected
            ? "text-blue-900 dark:text-blue-100"
            : "text-gray-900 dark:text-gray-100"
        }`}
      >
        {trek.title}
      </p>
      <p
        className={`text-sm mt-0.5 ${
          isSelected
            ? "text-blue-700 dark:text-blue-300"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {isSelected ? "Added to your trip" : "Tap to add"}
      </p>
    </div>
  </motion.button>
);