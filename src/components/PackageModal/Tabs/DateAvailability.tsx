// utils/dateCurrency.ts
import { type DateAvailability } from "../../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";

// Format timestamp to readable date
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, { // use locale from user settings
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Format number to currency according to locale
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Display Date Availability Component
export const DateAvailabilityDisplay = ({
  dateAvailabilities,
  startDate,
  setPrice,
  setStartDate,
  setEndDate,
}: {
  dateAvailabilities: DateAvailability[];
  startDate?: number;
  setPrice?: (price: number) => void;
  setStartDate?: (date: number) => void;
  setEndDate?: (date: number) => void;
}) => {
  const { t } = useTranslation();
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const getAvailabilityStatus = (spots: number) => {
    if (spots > 5) {
      return {
        color: "bg-green-500",
        text: t("datesTab.spotsAvailable", { count: spots }),
        textColor: "text-green-500 dark:text-green-400",
      };
    } else if (spots > 0) {
      return {
        color: "bg-yellow-500",
        text: t("datesTab.limitedSpots", { count: spots }),
        textColor: "text-yellow-500 dark:text-yellow-400",
      };
    } else {
      return {
        color: "bg-red-500",
        text: t("datesTab.fullyBooked"),
        textColor: "text-red-500 dark:text-red-400",
      };
    }
  };

  const upcomingAvailabilities = dateAvailabilities
    .filter((avail) => avail.endDate > currentTimestamp)
    .sort((a, b) => a.startDate - b.startDate);

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="mb-6 sm:mb-8 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        {dateAvailabilities.length > 0 && (
          <span className="text-xs text-gray-700 dark:text-gray-300">
            {t("datesTab.optionsAvailable", { count: dateAvailabilities.length })}
          </span>
        )}
      </div>

      {upcomingAvailabilities.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          {t("datesTab.noUpcomingDates")}
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {upcomingAvailabilities.map((availability, index) => {
            const status = getAvailabilityStatus(availability.availableSpots);
            const durationDays = Math.ceil(
              (availability.endDate - availability.startDate) / (60 * 60 * 24)
            );
            const discount = calculateDiscount(
              availability.price,
              availability.originalPrice
            );
            const hasPrice =
              availability.price !== undefined && availability.price !== null;

            return (
              <div
                key={index}
                className={`p-2 sm:p-3 rounded-xl cursor-pointer border transition-all duration-300 ease-in-out ${
                  startDate === availability.startDate
                    ? "bg-blue-500/20 dark:bg-blue-600/20 border-blue-400 shadow-lg shadow-blue-500/30"
                    : "bg-white/50 dark:bg-neutral-800/80 border-gray-200 dark:border-gray-700 hover:bg-gray-100/70 dark:hover:bg-neutral-700 hover:-translate-y-0.5"
                }`}
                onClick={() => {
                  setStartDate && setStartDate(availability.startDate);
                  setPrice && setPrice(availability.price);
                  setEndDate && setEndDate(availability.endDate);
                }}
                aria-selected={startDate === availability.startDate}
                role="option"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                      {formatDate(availability.startDate)} – {formatDate(availability.endDate)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {durationDays} {t(durationDays === 1 ? "datesTab.day" : "datesTab.days")}
                    </p>
                  </div>

                  <div className="text-right">
                    {hasPrice ? (
                      <div className="flex flex-wrap items-center justify-end gap-1">
                        {discount > 0 && (
                          <span className="text-xs line-through text-gray-500 dark:text-gray-400">
                            {formatCurrency(availability.originalPrice!)}
                          </span>
                        )}
                        <span
                          className={`font-bold text-sm sm:text-base ${
                            discount > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          {formatCurrency(availability.price)}
                        </span>
                        {discount > 0 && (
                          <span className="ml-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs px-2 py-0.5 rounded-full">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 italic text-xs sm:text-sm">
                        {t("datesTab.priceComingSoon")}
                      </span>
                    )}
                  </div>
                </div>

                {availability.availableSpots > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-blue-500 dark:bg-blue-400 h-1.5 sm:h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (availability.availableSpots / availability.maxTravelers) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex items-center mt-1 justify-between">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${status.color}`}></div>
                        <p className={`text-xs sm:text-sm ${status.textColor}`}>{status.text}</p>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {availability.maxTravelers - availability.availableSpots}{" "}
                        {t("datesTab.spotsAvailable", { count: availability.maxTravelers })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
