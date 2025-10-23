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
  const {t}=useTranslation()
  // State to track which day is currently in view
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const travelPackage = useSelectedTravelPackage(id);
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!travelPackage) {
    return <div>{t("noPackage")}</div>;
  }

  // Scroll observer to detect which day is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    dayRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setCurrentDayIndex(index);
            }
          });
        },
        {
          threshold: [0.5],
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [travelPackage.days?.length]);

  const dayWiseTimeline: TimelineEntry[] =
    travelPackage.days?.map((day, idx) => ({
      title: null,
      content: (
        <DayWiseTimelineCard
          day={day.day}
          title={day.title}
          activities={day.activities}
          stay={day.stay}
          meals={day.meals}
          innerRef={(el) => {
            dayRefs.current[idx] = el;
          }}
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
        rounded-2xl p-4 md:p-8 pb-80
        border border-gray-200 dark:border-gray-700
        shadow-md dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]
        transition-all duration-300 ease-in-out mb-20
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
              day={travelPackage.days[currentDayIndex]}
              allDays={travelPackage.days}
              isSelected={true}
              currentDayIndex={currentDayIndex}
            />
          )}
        </div>

        {/* Day by Day Content */}
        <div className="flex flex-col gap-4 pointer-events-none pb-40">
          {dayWiseTimeline.map((entry, i) => (
            <div key={i} className="py-16">{entry.content}</div>
          ))}
        </div>

    </div>
  );
};

export default ItineraryTab;