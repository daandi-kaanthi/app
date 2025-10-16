// components/ui/MapCard.tsx
import React from "react";
import { Description } from "../ui/Text/Description";
import { useTranslation } from "react-i18next";
import { useSelectedTravelPackage } from "../../redux/slices/Travel/TravelSlice";

interface MapCardProps {
  nearestId: string;
  comingSoon?: boolean;
  onViewDetails?: () => void;
  minWidth?: number;
  maxWidth?: number;
}

const MapCard: React.FC<MapCardProps> = ({
  nearestId,
  comingSoon = false,
  onViewDetails,
  minWidth = 160,
  maxWidth = 220,
}) => {
  const { t } = useTranslation();
  const selectedTravelPackage = useSelectedTravelPackage(nearestId);

  return (
    <div
      className="p-2 text-center rounded-lg  transition-colors duration-200
                 bg-white text-black border border-gray-200
                 dark:bg-gray-800 dark:text-white dark:border-gray-700"
      style={{ minWidth, maxWidth }}
    >
      {comingSoon && (
          <Description description={t("expandingSoon")} />
      )}

      {selectedTravelPackage && onViewDetails && comingSoon && (
        <>
          <h3 className="font-semibold mb-1 text-sm">
            {t("nearest")} : {selectedTravelPackage.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="text-blue-600 py-1 font-bold hover:underline text-sm"
          >
            {t("viewDetails")}
          </button>
        </>
      )}
    </div>
  );
};

export default MapCard;
