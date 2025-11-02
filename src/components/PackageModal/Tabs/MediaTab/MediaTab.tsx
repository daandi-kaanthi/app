import { useState, useEffect } from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../../../Card/DraggableCard";
import { useSelectedTravelPackage } from "../../../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";

interface MediaTabsProps {
  id: string;
}

export const MediaTabs = ({ id }: MediaTabsProps) => {
  const selectedTravelPackage = useSelectedTravelPackage(id);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { t } = useTranslation();

  if (!selectedTravelPackage) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center text-lg text-neutral-500">
        {t("noPackage")}
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

  // Handle browser back button for fullscreen
  useEffect(() => {
    const handlePopState = () => {
      if (isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isFullscreen]);

  const openFullscreen = (index: number) => {
    setActiveIndex(index);
    setIsFullscreen(true);
    // Push a new history state so back button can close fullscreen
    window.history.pushState({ fullscreen: true }, "");
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    // Remove the fullscreen history state so back works normally
    if (window.history.state?.fullscreen) {
      window.history.back();
    }
  };

  const prevImage = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + allImages.length) % allImages.length);
    }
  };

  const nextImage = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % allImages.length);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
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
          {t("photos")}
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === "videos"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          }`}
        >
          {t("videos")}
        </button>
      </div>

      {/* Media Display */}
   <DraggableCardContainer className="relative flex w-full items-center justify-center overflow-visible min-h-[70vh]">
     {mediaItems.length === 0 ? (
          <div className="text-neutral-500 text-lg">
            {activeTab === "photos" ? t("noPhotos") : t("noVideos")}
          </div>
        ) : (
          mediaItems.map((src: string, index: number) => (
            <DraggableCardBody
              key={src}
              className={randomClasses[index % randomClasses.length]}
              isActive={activeIndex === index}
              onClick={() => {
                if (activeTab === "photos") openFullscreen(index);
              }}
            >
              {activeTab === "photos" ? (
                <img
                  src={src}
                  alt={`${t("photos")} -${index + 1}`}
                  className="pointer-events-none relative z-10 h-60 w-60 object-cover rounded-2xl shadow-lg cursor-pointer"
                />
              ) : (
                <video
                  src={src}
                  controls
                  className="relative z-10 h-80 w-80 object-cover rounded-2xl shadow-lg"
                />
              )}
            </DraggableCardBody>
          ))
        )}
      {/* Fullscreen Gallery */}
      {isFullscreen && activeIndex !== null && (
        <div className="fixed inset-0 z-500 flex items-center justify-center bg-white dark:bg-black bg-opacity-90">
          {/* Close button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-5 right-5 z-50 text-black dark:text-white text-2xl md:text-3xl font-bold p-2 rounded-full bg-black/20 dark:bg-white/20 "
          >
            ✕
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-5 z-50 text-black bg-white dark:text-white dark:bg-black text-4xl font-bold p-2 rounded-full "
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-5 z-50 text-black bg-white dark:text-white dark:bg-black text-4xl font-bold p-2 rounded-full "
          >
            ›
          </button>

          <img
            src={allImages[activeIndex]}
            alt={`Full Image - ${activeIndex + 1}`}
            className="h-[80%] w-[80%] object-contain rounded-lg "
          />
        </div>
      )}
      </DraggableCardContainer>

    </div>
  );
};

export default MediaTabs;
