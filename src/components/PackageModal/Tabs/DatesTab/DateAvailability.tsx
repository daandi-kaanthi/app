import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useSelectedTravelPackage,
  type DateAvailability,
  type FlattenedTravelPackage,
} from "../../../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { useTrekAddOns } from "../../../../context/TrekAddOnContext";
import { AddOnListItem } from "./AddOnListItem";
import { DateListItem } from "./DateListItem";

// Re-defining helpers here for self-containment in this response.
const formatDateRange = (s: number, e: number) =>
  `${format(new Date(s * 1000), "dd MMM")} - ${format(new Date(e * 1000), "dd MMM yyyy")}`;

const formatDateShort = (s: number) =>
  `${format(new Date(s * 1000), "dd MMM")} `;

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    />
  </svg>
);

// --- MODAL WRAPPER LOGIC (Could be extracted further) ---

const ModalContent: React.FC<{
  title: string;
  subtitle: string;
  gradient: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, subtitle, gradient, onClose, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed bottom-[100px] left-1/2 -translate-x-1/2 z-40 w-[94%] sm:w-[520px] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden"
  >
    <div className={gradient + " p-4"}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-xs text-white/90 mt-0.5">{subtitle}</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">{children}</div>
  </motion.div>
);

// --- MAIN COMPONENT ---

export const DateAvailabilityDisplay: React.FC<{
  id: string;
  availableTrekIds?: string[];
}> = ({ id, availableTrekIds = ["1", "7"] }) => {
  const { t } = useTranslation();
  const [showAddOnsSelector, setShowAddOnsSelector] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const { selectedTrekIds, setSelectedTrekIds } = useTrekAddOns();

  const mainPackage = useSelectedTravelPackage(id);

  const allAvailableTreksData = availableTrekIds.map((trekId) => ({
    id: trekId,
    data: useSelectedTravelPackage(trekId),
  }));

  const allAvailableTreks = allAvailableTreksData
    .map((item) => item.data)
    .filter(Boolean) as FlattenedTravelPackage[];

  const additionalTreks = allAvailableTreksData
    .filter((item) => selectedTrekIds.includes(item.id))
    .map((item) => item.data)
    .filter(Boolean) as FlattenedTravelPackage[];

  const availableAddOns = allAvailableTreks.filter((trek) => trek.id !== id);

  const packageTitles = [mainPackage, ...additionalTreks]
    .filter(Boolean)
    .map((pkg) => pkg?.title)
    .join(" + ");

  const availabilities = mainPackage?.dateAvailabilities || [];
  const upcoming = availabilities
    .filter((d) => d.endDate > Math.floor(Date.now() / 1000))
    .sort((a, b) => a.startDate - b.startDate);

  const [selectedRange, setSelectedRange] = useState<DateAvailability | null>(
    upcoming[0] || null
  );

  const handleBookNow = () => {
    if (!selectedRange) return;
    window.open(
      `https://wa.me/9548883930?text=Hi! I want to book: ${packageTitles} on ${formatDateRange(
        selectedRange.startDate,
        selectedRange.endDate
      )}.`,
      "_blank"
    );
  };

  const handleTrekToggle = (trekId: string) => {
    setSelectedTrekIds((prev) =>
      prev.includes(trekId)
        ? prev.filter((id) => id !== trekId)
        : [...prev, trekId]
    );
  };

  const handleDateSelect = (date: DateAvailability) => {
    setSelectedRange(date);
    setShowDateSelector(false);
  };

  if (!upcoming.length)
    return (
      <p className="text-gray-500 text-sm text-center py-4">
        {t("datesTab.noUpcomingDates")}
      </p>
    );

  return (
    <div className="relative">
      {/* Backdrop Overlay - Combined for both modals */}
      <AnimatePresence>
        {(showDateSelector || showAddOnsSelector) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowDateSelector(false);
              setShowAddOnsSelector(false);
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Date Selector Modal (Uses ModalContent and simplified mapping) */}
      <AnimatePresence>
        {showDateSelector && (
          <ModalContent
            title="Choose Your Dates"
            subtitle={`${upcoming.length} available batches`}
            gradient="bg-gradient-to-r from-green-500 to-emerald-600"
            onClose={() => setShowDateSelector(false)}
          >
            {upcoming.map((date, i) => (
              <DateListItem
                key={i}
                date={date}
                selectedRange={selectedRange}
                onSelect={handleDateSelect}
              />
            ))}
          </ModalContent>
        )}
      </AnimatePresence>

      {/* Add-Ons Selector Modal (Uses ModalContent and simplified mapping) */}
      <AnimatePresence>
        {showAddOnsSelector && (
          <ModalContent
            title="Add-On Experiences"
            subtitle="Choose optional extensions for your trip"
            gradient="bg-gradient-to-r from-blue-500 to-cyan-600"
            onClose={() => setShowAddOnsSelector(false)}
          >
            {availableAddOns.length > 0 ? (
              availableAddOns.map((trek) => (
                <AddOnListItem
                  key={trek.id}
                  trek={trek}
                  isSelected={selectedTrekIds.includes(trek.id)}
                  onToggle={handleTrekToggle}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No additional experiences available for this package.
              </p>
            )}
          </ModalContent>
        )}
      </AnimatePresence>

      {/* Bottom Action Bar (Unchanged structure) */}
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-2 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-700 sm:left-1/2 sm:-translate-x-1/2 w-full max-w-xl sm:rounded-t-2xl sm:shadow-2xl"
      >
        <div className="flex items-center gap-2">
          {/* Plus Button to open Add-Ons Modal */}
          {availableAddOns.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddOnsSelector(!showAddOnsSelector)}
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-colors"
            >
              <PlusIcon />
            </motion.button>
          )}

          {/* Date Selector Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDateSelector(!showDateSelector)}
            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/30 border border-blue-300 dark:border-blue-700 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/70 dark:hover:to-cyan-900/50 transition-all"
          >
            <CalendarIcon />
            <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
              {selectedRange
                ? formatDateShort(selectedRange.startDate)
                : "Pick Date"}
            </span>
          </motion.button>

          {/* Book Now Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleBookNow}
            disabled={!selectedRange}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{t("datesTab.bookNow")}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
