import { Flag } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DayWiseTimelineCardProps {
  day: number;
  title: string;
  activities?: string[];
  stay?: string;
  meals?: string;
  innerRef?: (el: HTMLDivElement | null) => void;
}

export default function DayWiseTimelineCard({
  day,
  title,
  activities,
  stay,
  meals,
  innerRef,
}: DayWiseTimelineCardProps) {
  const { t } = useTranslation();
  return (
    <div
      ref={innerRef}
      className="pt-0 border-b border-gray-200 last:border-0 overflow-y-auto max-h-[100vh]"
    >
      <div className="flex items-center gap-4 mb-4">
        <Flag className="text-red-500 h-10 w-10 md:h-12 md:w-12" />
        <h3 className="text-base md:text-md font-bold mb-2">
          {t("day")} {day}: {title}
        </h3>
      </div>
      <ul className="list-disc pl-5 mb-4 space-y-2">
        {activities &&
          activities.map((activity, i) => (
            <li key={i} className="text-sm leading-relaxed">
              {activity}
            </li>
          ))}
      </ul>
      <div className="flex flex-wrap gap-4">
        {stay && (
          <div className="px-3 py-1 rounded-full text-xs md:text-sm bg-gray-100 dark:bg-gray-900">
            <span className="font-medium">{t("stay")}:</span> {stay}
          </div>
        )}
        {meals && (
          <div className="px-3 py-1 rounded-full text-xs md:text-sm bg-gray-100 dark:bg-gray-900">
            <span className="font-medium">{t("meals")}:</span> {meals}
          </div>
        )}
      </div>
    </div>
  );
}
