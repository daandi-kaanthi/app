import { CalendarCheck, MapPinned, Clock9, MountainSnow } from "lucide-react";
import { useSelectedTravelPackage } from "../../../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";
import { Timeline, type TimelineEntry } from "./Timeline";
import SinglePackageStreetView from "../../../Map/SinglePackageStreetView";

// 🔹 Default shared sections for all itineraries
const defaultInclusions = [
  "Comfortable Transport From Dehradun To Dehradun",
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
  `nything not mentioned under "Inclusions"`,
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

interface OverviewProps {
  id: string;
}

export default function Overview({ id }: OverviewProps) {
  const travelPackage = useSelectedTravelPackage(id);
  const { t } = useTranslation();

  if (!travelPackage) {
    return <div className="flex justify-center item-center">{t("noPackage")}</div>;
  }

  const formatTravelPackageData = (): TimelineEntry[] => {
    return [
      {
        title: "",
        content: (
          <div>
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
        title: (
          <h3 className="block pl-7 md:text-2xl text-lg px-1 font-bold text-neutral-500 dark:text-neutral-500">
            {t("tourInclusions")}
          </h3>
        ),
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
        title: (
          <h3 className="block pl-7 md:text-2xl text-lg px-1 font-bold text-neutral-500 dark:text-neutral-500">
            {t("tourExclusions")}
          </h3>
        ),
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
        title: (
          <h3 className="block pl-7 md:text-2xl text-lg px-1 font-bold text-neutral-500 dark:text-neutral-500">
            {t("whyChooseUs")}
          </h3>
        ),
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
        title: (
          <h3 className="block pl-7 md:text-2xl text-lg px-1 font-bold text-neutral-500 dark:text-neutral-500">
            {t("bookAdventure")}
          </h3>
        ),
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
    <div
      className="
        text-gray-900 dark:text-gray-100
         md:p-8
        shadow-md dark:shadow-[0_0_15px_rgba(0,0,0,0.4)]
        transition-all duration-300 ease-in-out
      "
    >   
        <SinglePackageStreetView
          pkg={{
            id: id,
            name: travelPackage?.title,
            geoLocation: travelPackage?.geoLocation || [28.6139, 77.209],
          }}
        />
        <p className="mb-6 text-sm md:text-lg leading-relaxed pt-4">
          {travelPackage.overview?.description}
        </p>
      <Timeline data={formatTravelPackageData()} />
    </div>
  );
}
