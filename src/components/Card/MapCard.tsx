import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedTravelPackage } from "../../redux/slices/Travel/TravelSlice";
import { Description } from "../ui/Text/Description";

interface MapCardProps {
  nearestId: string;
  comingSoon?: boolean;
  onViewDetails?: () => void;
  minWidth?: number;
  maxWidth?: number;
  location?: string;
}

const MapCard: React.FC<MapCardProps> = ({
  nearestId,
  comingSoon = false,
  onViewDetails,
  minWidth = 160,
  maxWidth = 220,
  location
}) => {
  const { t } = useTranslation();
  const selectedTravelPackage = useSelectedTravelPackage(nearestId);

  const contactViaWhatsApp = () => {
    const phone = import.meta.env.VITE_CONTACT_PHONE;
    const message = encodeURIComponent(
      t("whatsappMessageCustom", {
        location: location || t("defaultLocation") // fallback translation
      })
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div
      className="px-2 text-center rounded-lg transition-colors duration-200
                 bg-white text-black border border-gray-200
                 dark:bg-neutral-950 dark:text-white dark:border-gray-700"
      style={{ minWidth, maxWidth }}
    >
      {comingSoon && (
        <Description description={t("expandingSoon")} className="text-sm px-2 py-2" />
      )}

      {comingSoon && (
        <div
          className="border border-dashed border-blue-500 rounded-md p-3 mb-2 bg-blue-50 dark:bg-blue-950 dark:border-blue-400"
        >
          <h3 className="font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">
            {t("privatePackageInterestTitle")}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              contactViaWhatsApp();
            }}
            className="w-full text-sm font-medium py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {t("contactUs")}
          </button>
        </div>
      )}

      {selectedTravelPackage && onViewDetails && (
        <div className="flex justify-between items-center gap-2 py-4">
          <h3 className="font-semibold mb-1 text-sm">
            {t("nearest")} {selectedTravelPackage.title}
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
        </div>
      )}
    </div>
  );
};

export default MapCard;
