import { useState } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../../Card/DraggableCard";
import { useSelectedTravelPackage } from "../../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";

interface MediaTabsProps {
  id: string;
}

export const MediaTabs = ({ id }: MediaTabsProps) => {
  const selectedTravelPackage = useSelectedTravelPackage(id);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  if (!selectedTravelPackage) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center text-lg text-neutral-500">
        { t("noPackage")}
      </div>
    );
  }

  const { images, image, videos } = selectedTravelPackage;
  const allImages = images?.length ? images : image ? [image] : [];
  const allVideos = videos?.length ? videos : [];

  const randomClasses = [
    "absolute top-10 left-[20%] rotate-[-5deg]",
    "absolute top-32 left-[35%] rotate-[7deg]",
    "absolute top-16 right-[30%] rotate-[5deg]",
    "absolute top-24 left-[50%] rotate-[-8deg]",
    "absolute top-20 right-[45%] rotate-[3deg]",
  ];

  const mediaItems = activeTab === "photos" ? allImages : allVideos;

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      {/* Tabs Header */}
      <div className="mb-6 flex space-x-6">
        <button
          onClick={() => setActiveTab("photos")}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === "photos"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          }`}
        >
         { t("photos")}
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === "videos"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          }`}
        >
          { t("videos")}
        </button>
      </div>

      {/* Media Display */}
      <DraggableCardContainer className="relative flex w-full items-center justify-center overflow-clip min-h-[70vh]">
        {mediaItems.length === 0 ? (
          <div className="text-neutral-500 text-lg">
            {activeTab == "photos" ?   t("noPhotos") : t("noVideos")}
          </div>
        ) : (
          mediaItems.map((src: string, index: number) => (
            <DraggableCardBody
              key={src}
              className={randomClasses[index % randomClasses.length]}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >
              {activeTab === "photos" ? (
                <img
                  src={src}
                  alt={`${t("photos")} -${index + 1}`}
                  className="pointer-events-none relative z-10 h-80 w-80 object-cover rounded-2xl shadow-lg"
                />
              ) : (
                <video
                  src={src}
                  controls
                  className="pointer-events-none relative z-10 h-80 w-80 object-cover rounded-2xl shadow-lg"
                />
              )}
            </DraggableCardBody>
          ))
        )}
      </DraggableCardContainer>
    </div>
  );
};
