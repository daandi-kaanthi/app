import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTrekAddOns } from "../../../../context/TrekAddOnContext";
import TravelDayMap from "../../../Map/TravelItineraryMap";
import type {
  TravelState,
  ITravelPackage,
  DayActivity,
  DayLocation,
  FlattenedTravelPackage,
} from "../../../../redux/slices/Travel/TravelSlice";
import { useMemo, useState, useEffect } from "react";

// ✅ Pure helper (same logic as inside useSelectedTravelPackage but hook-free)
const mergePackageWithTranslation = (
  pkg: ITravelPackage,
  lang: string
): FlattenedTravelPackage | undefined => {
  if (!pkg) return undefined;
  const translation =
    pkg.translations[lang as keyof typeof pkg.translations] ||
    pkg.translations.en;

  // Merge days + location (like the hook)
  const mergedDays = translation.days
    ?.map((day) => {
      const location = pkg.days?.find((d) => d.day === day.day)?.location;
      if (!location) return null;
      return { ...day, location };
    })
    .filter((d): d is DayActivity & DayLocation => d !== null);

  return {
    ...pkg,
    ...translation,
    days: mergedDays,
  };
};

interface ItineraryTabProps {
  id: string;
}

export const ItineraryTab = ({ id }: ItineraryTabProps) => {
  const { t, i18n } = useTranslation();
  const { selectedTrekIds } = useTrekAddOns();

  const allPackages = useSelector(
    (state: { travelCollection: TravelState }) =>
      state.travelCollection.travelPackages
  );

  const mainPackageRaw = allPackages.find((pkg) => pkg.id === id);
  const mainPackage = mergePackageWithTranslation(mainPackageRaw!, i18n.language);

  const addOnPackages = selectedTrekIds
    .map((trekId) => allPackages.find((pkg) => pkg.id === trekId))
    .filter(Boolean)
    .map((pkg) => mergePackageWithTranslation(pkg!, i18n.language))
    .filter(Boolean) as FlattenedTravelPackage[];

  const combinedDays = useMemo(() => {
    if (!mainPackage) return [];
    let dayCounter = 1;

    const normalize = (pkg: FlattenedTravelPackage, isMain: boolean) =>
      (pkg.days || []).map((day) => ({
        ...day,
        day: dayCounter++,
        title: day.title || `Day ${dayCounter}`,
        location: day.location,
        activities: day.activities || [],
        stay: day.stay || "",
        meals: day.meals || "",
        source: isMain ? "Main Trek" : pkg.title,
      }));

    return [
      ...normalize(mainPackage, true),
      ...addOnPackages.flatMap((pkg) => normalize(pkg, false)),
    ];
  }, [mainPackage, addOnPackages]);

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // ✅ Automatically reset index if out of range
  useEffect(() => {
    if (selectedDayIndex >= combinedDays.length) {
      setSelectedDayIndex(combinedDays.length - 1 >= 0 ? combinedDays.length - 1 : 0);
    }
  }, [combinedDays, selectedDayIndex]);

  if (!mainPackage) {
    return <div className="flex justify-center">{t("noPackage")}</div>;
  }

  return (
    <div className="text-gray-900 dark:text-gray-100 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
      <div
        className="sticky top-0 z-10 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
        style={{ height: "60vh" }}
      >
        {combinedDays.length > 0 && (
          <TravelDayMap
            day={combinedDays[selectedDayIndex]}
            allDays={combinedDays}
            isSelected={true}
            currentDayIndex={selectedDayIndex}
            setSelectedDayIndex={setSelectedDayIndex}
            t={t}
          />
        )}
      </div>
    </div>
  );
};


export default ItineraryTab;
