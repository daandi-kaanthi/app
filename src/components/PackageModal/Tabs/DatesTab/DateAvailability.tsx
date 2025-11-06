import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useSelectedTravelPackage,
  type DateAvailability,
} from "../../../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export const DateAvailabilityDisplay: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslation();
  const travelPackage = useSelectedTravelPackage(id);
  const availabilities = travelPackage?.dateAvailabilities || [];
  const title = travelPackage?.title;

  const [showDateSelector, setShowDateSelector] = useState(false);
  const now = Math.floor(Date.now() / 1000);

  const upcoming = availabilities
    .filter((d) => d.endDate > now)
    .sort((a, b) => a.startDate - b.startDate);

  const [selectedRange, setSelectedRange] = useState<DateAvailability | null>(
    upcoming.length ? upcoming[0] : null
  );

  if (!upcoming.length)
    return (
      <p className="text-gray-500 text-sm text-center py-4">
        {t("datesTab.noUpcomingDates")}
      </p>
    );

  const formatDateRange = (s: number, e: number) =>
    `${format(new Date(s * 1000), "dd MMM")} - ${format(
      new Date(e * 1000),
      "dd MMM yyyy"
    )}`;

  const handleBookNow = () => {
    if (!selectedRange) return;
    window.open(
      `https://wa.me/9548883930?text=Hi! I want to book ${title} on ${formatDateRange(
        selectedRange.startDate,
        selectedRange.endDate
      )}.`,
      "_blank"
    );
  };

  return (
    <div className="relative ">
      {/* Floating Bottom Bar */}
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-2  flex flex-col justify-center
                   bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-700
                   sm:left-1/2 sm:-translate-x-1/2 w-full max-w-xl sm:rounded-t-2xl sm:shadow-2xl"
      >
        {/* Top Action Tabs */}
        <div className="flex justify-between gap-2 mb-2 p-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDateSelector((v) => !v)}
            className="flex-1 flex items-center justify-between p-3 rounded-xl border border-gray-300 dark:border-gray-600
                       bg-gray-50 dark:bg-neutral-800 text-sm font-medium text-gray-700 dark:text-gray-200 
                       hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t("datesTab.selectedDate")}
              </span>
              <span className="font-semibold">
                {selectedRange
                  ? formatDateRange(
                      selectedRange.startDate,
                      selectedRange.endDate
                    )
                  : "Select Date"}
              </span>
            </div>
            <CalendarIcon />
          </motion.button>
        </div>

        {/* Book Now Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleBookNow}
          disabled={!selectedRange}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-lg font-bold py-3 rounded-xl shadow-lg transition"
        >
          {t("datesTab.bookNow")}
        </motion.button>
      </motion.div>

      {/* Animated Date Selector */}
      <AnimatePresence>
        {showDateSelector && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="fixed bottom-[130px] left-1/2 -translate-x-1/2 z-40 w-[96%] sm:w-[480px]
                       bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-gray-700
                       shadow-2xl p-3 max-h-[50vh] overflow-y-auto"
          >
            {upcoming.map((date, i) => {
              const isActive =
                selectedRange?.startDate === date.startDate &&
                selectedRange?.endDate === date.endDate;
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedRange(date);
                    setShowDateSelector(false);
                  }}
                  className={`w-full flex justify-between items-center p-3 rounded-xl text-sm mb-2 transition
                    ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/30 border border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    }`}
                >
                  <span>{formatDateRange(date.startDate, date.endDate)}</span>
                  {isActive && (
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs">
                      ✓
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
