import { useSelectedTravelPackage } from "../../../../redux/slices/Travel/TravelSlice";
import { type AppDispatch } from "../../../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import SinglePackageStreetView from "../../../Map/SinglePackageStreetView";

interface ThreeDTabProps {
  id: string;
}

export const ThreeDTab = ({ id }: ThreeDTabProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // fetchSingleTravelPackageApi commented for now
  }, [dispatch, id]);

  const travelPackage = useSelectedTravelPackage(id);

  return (
    <div
      className="
        text-gray-900 dark:text-gray-100
        rounded-2xl p-4 md:p-8 pb-28
        border border-gray-200 dark:border-gray-700
        shadow-md dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]
        transition-all duration-300 ease-in-out mb-20
      "
    >
      <h2
        className="text-xl md:text-2xl font-semibold 
              text-emerald-600 dark:text-emerald-400 
              mb-2 md:mb-2 flex items-center"
      >
        {t("datesTab.availableDates")}
      </h2>
      <SinglePackageStreetView
        pkg={{
          id:id,
          name: travelPackage?.title || "Delhi",
          geoLocation: travelPackage?.geoLocation || [28.6139, 77.209],
        }}
      />
    </div>
  );
};
