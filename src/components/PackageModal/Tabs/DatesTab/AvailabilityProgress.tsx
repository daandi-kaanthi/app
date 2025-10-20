"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface AvailabilityProgressProps {
  availableSpots: number;
  maxTravelers: number;
  status: {
    color: string;
    text: string;
    textColor: string;
  };
}

const AvailabilityProgress: React.FC<AvailabilityProgressProps> = ({
  availableSpots,
  maxTravelers,
  status,
}) => {
  const { t } = useTranslation();

  if (availableSpots <= 0) return null;

  const progressPercent = Math.min(100, (availableSpots / maxTravelers) * 100);

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 sm:h-2">
        <div
          className="bg-blue-500 dark:bg-blue-400 h-1.5 sm:h-2 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="flex items-center mt-1 justify-between">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${status.color}`}></div>
          <p className={`text-xs sm:text-sm ${status.textColor}`}>{status.text}</p>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {t("datesTab.spotsAvailable", { count: maxTravelers })}
        </p>
      </div>
    </div>
  );
};

export default AvailabilityProgress;
