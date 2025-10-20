import type { ReactNode } from "react";
import {
  CalendarCheck,
  MapPinned,
  Clock9,
  MountainSnow,
  Flag,
} from "lucide-react";
import { useSelectedTravelPackage } from "../../../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";
import { Timeline } from "./Timeline";
import SinglePackageStreetView from "../../../Map/SinglePackageStreetView";

// 🔹 Default shared sections for all itineraries
const defaultInclusions = [
  "Comfortable Transport From Delhi To Delhi",
  "Nights accommodation in scenic camps or guesthouses",
  "Daily meals",
  "Guided trek",
  "First aid support during trekking",
  "Required permits and entry fees",
];

const defaultExclusions = [
  "Personal expenses (snacks, shopping, tips)",
  "Lunch Not Included",
  "Travel insurance",
  "Anything not mentioned under “Inclusions”",
];

const defaultWhyChooseUs = [
  "Offbeat Himalayan adventure with local Guides",
  "Clean stays & hygienic meals",
  "Experienced drivers & trek support",
];

const defaultContact = {
  phone: import.meta.env.VITE_CONTACT_PHONE || "+91-7310747066",
  email: "team@daandikaanthi.com",
  website: "www.daandikaanthi.com",
};

type TimelineItem = {
  title: string;
  content: ReactNode;
};

interface OverviewProps {
  id: string;
}
export default function Overview({ id }: OverviewProps) {
  // ✅ Get the selected travel package with translations applied
  const travelPackage = useSelectedTravelPackage(id);

  if (!travelPackage) {
    return <div>No package found</div>; // or a skeleton loader
  }

  const { t } = useTranslation();

  const formatTravelPackageData = (): TimelineItem[] => {
    return [
      {
        title: "",
        content: (
          <div>
            <div className="flex justify-center mb-6">
                  <SinglePackageStreetView
        pkg={{
          id:id,
          name: travelPackage?.title || "Delhi",
          geoLocation: travelPackage?.geoLocation || [28.6139, 77.209],
        }}
      />
            </div>
            <p className="mb-6 text-sm md:text-lg leading-relaxed">
              {travelPackage.overview?.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <CalendarCheck className="mt-1 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {t("tabDates")}
                  </h3>
                  <p className="text-xs md:text-sm">
                    {travelPackage.overview?.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPinned className="mt-1 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {t("tabOverview")}
                  </h3>
                  <p className="text-xs md:text-sm">
                    {travelPackage.overview?.destinations}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock9 className="mt-1 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {t("bestTime")}
                  </h3>
                  <p className="text-xs md:text-sm">
                    {travelPackage.overview?.bestTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MountainSnow className="mt-1 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {t("tourType")}
                  </h3>
                  <p className="text-xs md:text-sm">
                    {travelPackage.overview?.type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: t("dayWiseItinerary"),
        content: (
          <div>
            {travelPackage.days?.map((day, index) => (
              <div
                key={index}
                className="mb-8 pb-8 border-b border-gray-200 last:border-0"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Flag className="text-red-500 h-10 w-10 md:h-12 md:w-12" />
                  <h3 className="text-base md:text-xl font-bold mb-2">
                    {t("day")} {day.day}: {day.title}
                  </h3>
                </div>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  {day.activities.map((activity, i) => (
                    <li
                      key={i}
                      className="text-sm md:text-base leading-relaxed"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <div className="px-3 py-1 rounded-full text-xs md:text-sm bg-gray-100 dark:bg-gray-900">
                    <span className="font-medium">{t("stay")}:</span> {day.stay}
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs md:text-sm bg-gray-100 dark:bg-gray-900">
                    <span className="font-medium">{t("meals")}:</span>{" "}
                    {day.meals}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: t("tourInclusions"),
        content: (
          <ul className="space-y-2">
            {defaultInclusions.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs md:text-sm leading-snug"
              >
                <span className="text-green-500">✔️</span> {t(item)}
              </li>
            ))}
          </ul>
        ),
      },
      {
        title: t("tourExclusions"),
        content: (
          <ul className="space-y-2">
            {defaultExclusions.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs md:text-sm leading-snug"
              >
                <span className="text-red-500">✖️</span> {t(item)}
              </li>
            ))}
          </ul>
        ),
      },
      {
        title: t("whyChooseUs"),
        content: (
          <ul className="space-y-2">
            {defaultWhyChooseUs.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs md:text-sm leading-snug"
              >
                <span className="text-blue-500">✅</span> {t(item)}
              </li>
            ))}
          </ul>
        ),
      },
      {
        title: t("bookAdventure"),
        content: (
          <div className="rounded-lg">
            <h3 className="text-base md:text-xl font-bold mb-4">
              {t("contactUs")}
            </h3>
            <div className="space-y-3">
              <p className="text-xs md:text-sm">
                <span className="font-medium">📞 {t("phone")}:</span>{" "}
                <a
                  href={`tel:${defaultContact.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {defaultContact.phone}
                </a>
              </p>
              <p className="text-xs md:text-sm">
                <span className="font-medium">📧 {t("email")}:</span>{" "}
                <a
                  href={`mailto:${defaultContact.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {defaultContact.email}
                </a>
              </p>
              <p className="text-xs md:text-sm">
                <span className="font-medium">🌐 {t("website")}:</span>{" "}
                <a
                  href={`https://${defaultContact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {defaultContact.website}
                </a>
              </p>
            </div>
            <p className="mt-4 italic text-sm md:text-base leading-relaxed">
              {t("limitedSeats")}
            </p>
          </div>
        ),
      },
    ];
  };

  return (
    <div className="mx-auto px-3 md:px-8 ">
      <Timeline data={formatTravelPackageData()} />
    </div>
  );
}
