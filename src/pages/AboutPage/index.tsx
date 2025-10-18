"use client";
import { useTranslation } from "react-i18next";
import Explore from "../../assets/Explore.png";
import Himanshu from "../../assets/team/Himanshu.jpg";
import Shubham from "../../assets/team/Kunwar.jpg";
import Divya from "../../assets/team/Divya.jpeg";
import Jayant from "../../assets/team/Jayant.jpeg";
import Kajal from "../../assets/team/Kajal.jpeg";
import Yogesh from "../../assets/team/Yogesh.jpeg";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FocusCards } from "../../components/Card/TeamCard";
import { Timeline } from "../../components/Timeline/AboutTimeline";

export default function AboutPage() {
  const { t } = useTranslation();

  const mapLocation =
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d575.2870236611227!2d78.75416806785026!3d30.213501052485007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1750480927607!5m2!1sen!2sin";

  const cards = [
    {
      title: t("team.himanshu.title"),
      src: Himanshu,
      designation: t("team.himanshu.designation"),
    },
    {
      title: t("team.divya.title"),
      src: Divya,
      designation: t("team.divya.designation"),
    },
    {
      title: t("team.shubham.title"),
      src: Shubham,
      designation: t("team.shubham.designation"),
    },
    {
      title: t("team.jayant.title"),
      src: Jayant,
      designation: t("team.jayant.designation"),
    },
    {
      title: t("team.kajal.title"),
      src: Kajal,
      designation: t("team.kajal.designation"),
    },
    {
      title: t("team.yogesh.title"),
      src: Yogesh,
      designation: t("team.yogesh.designation"),
    },
  ];

  const data = [
    {
      title: t("timeline.birth.title"),
      content: (
        <div>
          <p className="mb-8 text-xl font-normal text-black dark:text-white">
            {t("timeline.birth.content1")}
          </p>
          <p className="mb-8 text-base font-normal italic text-black dark:text-white">
            {t("timeline.birth.content2")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-2">
            <img
              src={"/pwa-512x512.png"}
              alt={t("timeline.birth.imageAlt1")}
              className="h-32 w-32 rounded-lg object-cover shadow-md md:h-44 lg:h-60 md:w-44 lg:w-60"
            />
            <img
              src={Explore}
              alt={t("timeline.birth.imageAlt2")}
              className="h-32 w-32 rounded-lg object-cover shadow-md md:h-44 lg:h-60 md:w-44 lg:w-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: t("timeline.philosophy.title"),
      content: (
        <div>
          <p className="mb-8 text-xl font-normal text-black dark:text-white">
            {t("timeline.philosophy.content1")}
          </p>
          <p className="mb-8 text-base font-normal italic text-black dark:text-white">
            {t("timeline.philosophy.content2")}
          </p>
        </div>
      ),
    },
    {
      title: t("timeline.difference.title"),
      content: (
        <div>
          <p className="mb-8 text-xl font-normal text-black dark:text-white">
            {t("timeline.difference.content1")}
          </p>
          <div className="mb-8 italic">
            {(t("timeline.difference.points", { returnObjects: true }) as string[]).map(
              (point: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-base text-neutral-700 dark:text-neutral-300"
                >
                  ✅ {point}
                </div>
              )
            )}
          </div>
        </div>
      ),
    },
    {
      title: t("timeline.join.title"),
      content: (
        <div>
          <p className="mb-8 text-xl font-normal text-black dark:text-white">
            {t("timeline.join.content1")}
          </p>
          <p className="mb-8 text-base font-normal italic text-black dark:text-white">
            {t("timeline.join.content2")}
          </p>
          <div className="flex items-center space-x-8">
            <a
              href="https://www.facebook.com/profile.php?id=61575410837166"
              target="_blank"
              aria-label="Facebook"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/Daandikaanthi/"
              target="_blank"
              aria-label="Instagram"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/daandikaanthi/"
              target="_blank"
              aria-label="LinkedIn"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      ),
    },
    {
      title: t("timeline.team.title"),
      content: <FocusCards cards={cards} />,
    },
    {
      title: t("timeline.office.title"),
      content: (
        <div>
          <p className="mb-8 text-xl font-normal text-black dark:text-white">
            {t("timeline.office.address")}
          </p>
          <p className="mb-8 text-base font-normal text-black dark:text-white">
            {t("timeline.office.location")}
          </p>
          <p className="mb-8 text-base font-normal text-black dark:text-white">
            {t("timeline.office.state")}
          </p>
          <p className="mb-8 text-base font-normal text-black dark:text-white">
            {t("timeline.office.hours")}
          </p>
          <p className="mb-8 text-base font-normal text-black dark:text-white">
            📞 {t("timeline.office.phone")}
          </p>
          <p className="mb-8 text-base font-normal text-black dark:text-white">
            📧 {t("timeline.office.email")}
          </p>
          <iframe
            title="Daandikaanthi Adventures Location"
            src={mapLocation}
            width="100%"
            height="340px"
            style={{ border: 0, borderRadius: "8px" }}
            loading="lazy"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="relative w-full z-1">
        <div className="overflow-auto max-h-screen">
          <Timeline data={data} />
        </div>
      </div>
    </div>
  );
}
