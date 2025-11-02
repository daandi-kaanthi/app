import { useSelectedTravelPackage } from "../../../../redux/slices/Travel/TravelSlice";
import { type AppDispatch } from "../../../../redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DayWiseTimelineCard from "../../../Card/DayWiseTimelineCard";
import type { TimelineEntry } from "../OverViewTab/Timeline";
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

  if (!travelPackage) {
    return <div>{t("noPackageFound")}</div>;
  }
  const dayWiseTimeline: TimelineEntry[] =
    travelPackage.days?.map((day, _idx) => ({
      title: null,
      content: (
        <DayWiseTimelineCard
          day={day.day}
          title={day.title}
          activities={day.activities}
          stay={day.stay}
          meals={day.meals}
        />
      ),
    })) || [];

  useEffect(() => {
    // fetchSingleTravelPackageApi commented for now
  }, [dispatch, id]);

  return (
    <div
      className="
        text-gray-900 dark:text-gray-100
        rounded-2xl p-4 md:p-8
        border border-gray-200 dark:border-gray-700
        shadow-md dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]
        transition-all duration-300 ease-in-out 
      "
    >
      {/* Sticky Map Container */}
      <div
        ref={mapContainerRef}
        className="sticky top-0 z-10 mb-6 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
        style={{ height: "250px" }}
      >
        {travelPackage.days && travelPackage.days.length > 0 && (
          <TravelDayMap
            day={travelPackage.days[selectedDayIndex]}
            allDays={travelPackage.days}
            isSelected={true}
            currentDayIndex={selectedDayIndex}
          />
        )}
      </div>

      {/* Day Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          {dayWiseTimeline.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedDayIndex(index)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                whitespace-nowrap
                ${
                  selectedDayIndex === index
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }
              `}
            >
              {t("dayLabel", { number: index + 1 })} {/* ✅ dynamic translation */}
          
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Content */}
      <div className="pb-20">
        {dayWiseTimeline[selectedDayIndex]?.content}
      </div>
    </div>
  );
};

export default ItineraryTab;