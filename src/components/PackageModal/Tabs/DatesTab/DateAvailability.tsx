// utils/dateCurrency.ts
import { type DateAvailability } from "../../../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";
import { WhatsAppMessageButton } from "../../../ui/Button/WhatsAppMessageButton";

// ---------------------------
// Utility Functions
// ---------------------------

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ---------------------------
// React Component
// ---------------------------

interface DateAvailabilityDisplayProps {
  dateAvailabilities: DateAvailability[];
  title?: string;
}

export const DateAvailabilityDisplay: React.FC<
  DateAvailabilityDisplayProps
> = ({ dateAvailabilities, title = "Daandi Kaanthi" }) => {
  const { t } = useTranslation();
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const upcomingAvailabilities = dateAvailabilities
    .filter((avail) => avail.endDate > currentTimestamp)
    .sort((a, b) => a.startDate - b.startDate);

  return (
    <div className="mb-6 sm:mb-8 transition-all duration-300">
      {dateAvailabilities.length > 0 && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-700 dark:text-gray-300">
            {t("datesTab.optionsAvailable", {
              count: dateAvailabilities.length,
            })}
          </span>
        </div>
      )}

      {upcomingAvailabilities.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          {t("datesTab.noUpcomingDates")}
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {upcomingAvailabilities.map((availability, index) => {
            const durationDays = Math.ceil(
              (availability.endDate - availability.startDate) / (60 * 60 * 24)
            );

            const message = t("whatsappMessage", {
              title,
              date: formatDate(availability.startDate),
            });

            return (
              <div
                key={index}
                className="p-4 sm:p-3 rounded-xl cursor-pointer border border-gray-300 dark:border-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-100/70 dark:hover:bg-neutral-700"
                role="option"
              >
                <div className="flex flex-row justify-between items-center gap-2">
                  {/* Left Half: Date & Duration */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                      {formatDate(availability.startDate)} –{" "}
                      {formatDate(availability.endDate)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {durationDays}{" "}
                      {t(durationDays === 1 ? "datesTab.day" : "datesTab.days")}
                    </p>
                  </div>

                  {/* Right Half: WhatsApp Button */}
                  <div className="flex-shrink-0">
                    <WhatsAppMessageButton
                      phone={import.meta.env.VITE_CONTACT_SALES_PHONE}
                      message={message}
                      buttonText={t("contactViaWhatsApp")}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
