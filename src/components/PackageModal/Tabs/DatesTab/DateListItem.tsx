import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { type DateAvailability } from "../../../../redux/slices/Travel/TravelSlice";

interface DateListItemProps {
  date: DateAvailability;
  selectedRange: DateAvailability | null;
  onSelect: (date: DateAvailability) => void;
}

export const DateListItem: React.FC<DateListItemProps> = ({
  date,
  selectedRange,
  onSelect,
}) => {
  const isActive =
    selectedRange?.startDate === date.startDate &&
    selectedRange?.endDate === date.endDate;
  const daysLeft = Math.ceil(
    (date.startDate * 1000 - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(date)}
      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/30 border-2 border-green-400 dark:border-green-600 shadow-md"
          : "bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 border-2 border-transparent"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
          isActive ? "bg-green-500" : "bg-gray-200 dark:bg-neutral-700"
        }`}
      >
        <span
          className={`text-xs font-semibold ${
            isActive ? "text-white" : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {format(new Date(date.startDate * 1000), "MMM")}
        </span>
        <span
          className={`text-lg font-bold ${
            isActive ? "text-white" : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {format(new Date(date.startDate * 1000), "dd")}
        </span>
      </div>

      <div className="flex-1 text-left">
        {/* ✅ Show only starting date */}
        <p
          className={`font-semibold ${
            isActive
              ? "text-green-900 dark:text-green-100"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {format(new Date(date.startDate * 1000), "dd MMM yyyy")}
        </p>

        <p
          className={`text-xs mt-0.5 ${
            isActive
              ? "text-green-700 dark:text-green-300"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {daysLeft > 0 ? `Starts in ${daysLeft} days` : "Starting soon"}
        </p>
      </div>

      {isActive && (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="white"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      )}
    </motion.button>
  );
};
