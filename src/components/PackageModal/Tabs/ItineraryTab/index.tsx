import { useSelectedTravelPackage } from "../../../../redux/slices/Travel/TravelSlice";
import { type AppDispatch } from "../../../../redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import TravelDayMap from "../../../Map/TravelItineraryMap";
import { useTranslation } from "react-i18next";

interface ItineraryTabProps {
  id: string;
}

export const ItineraryTab = ({ id }: ItineraryTabProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const travelPackage = useSelectedTravelPackage(id);

  useEffect(() => {
    // fetchSingleTravelPackageApi commented for now
  }, [dispatch, id]);

  if (!travelPackage) {
    return <div className="flex justify-center">{t("noPackage")}</div>;
  }

  const days = travelPackage.days || [];

  return (
    <div
      className="
        text-gray-900 dark:text-gray-100
        rounded-2xl 
        border border-gray-200 dark:border-gray-700
        shadow-md dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]
        transition-all duration-300 ease-in-out
      "
    >
      {/* Sticky Map Container */}
      <div
        ref={mapContainerRef}
        className="sticky top-0 z-10 mb-6 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
        style={{ height: "50vh" }}
      >
        {days.length > 0 && (
          <TravelDayMap
            day={days[selectedDayIndex]}
            allDays={days}
            isSelected={true}
            currentDayIndex={selectedDayIndex}
            setSelectedDayIndex={setSelectedDayIndex} 
            t={t}
          />
        )}
      </div>

      {/* Day timeline content goes here */}
    </div>
  );
};

export default ItineraryTab;