import { DateAvailabilityDisplay } from "./DateAvailability";
import { type ITravelPackage, selectPackageDates } from "../../../redux/slices/Travel/TravelSlice";
import { type AppDispatch } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InfoIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DatesTabProps {
  id: string;
}

export const DatesTab = ({ id }: DatesTabProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    // fetchSingleTravelPackageApi commented for now
  }, [dispatch, id]);

  const dateAvailabilities = useSelector(selectPackageDates(id)) ?? [];

  return (
    <div
      className="
        bg-white/60 dark:bg-neutral-900/80
        text-gray-900 dark:text-gray-100
        rounded-2xl p-4 md:p-8 pb-28
        border border-gray-200 dark:border-gray-700
        shadow-md dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]
        transition-all duration-300 ease-in-out
      "
    >
      <div className="font-medium flex items-center">
        <div className="relative">
          <h2
            className="
              text-xl md:text-2xl font-semibold 
              text-emerald-600 dark:text-emerald-400 
              mb-2 md:mb-2 flex items-center
            "
          >
            {t('datesTab.availableDates')}
            <InfoIcon
              size={16}
              className="text-gray-700 dark:text-gray-300 cursor-help ml-2"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label={t('datesTab.availabilityInfo')}
            />
          </h2>

          {showTooltip && (
            <div
              className="
                absolute top-full left-0 mt-2 p-2
                bg-gray-100 dark:bg-gray-800
                text-gray-700 dark:text-gray-100
                text-xs rounded-lg shadow-lg z-10 w-56
                border border-gray-300 dark:border-gray-700
              "
            >
              {t('datesTab.spotLegend')}
            </div>
          )}
        </div>
      </div>

      <DateAvailabilityDisplay dateAvailabilities={dateAvailabilities || []} />
    </div>
  );
};
