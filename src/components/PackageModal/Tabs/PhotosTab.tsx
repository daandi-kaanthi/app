import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelectedTravelPackage } from "../../../redux/slices/Travel/TravelSlice.tsx";
// import {
//   fetchSingleTravelPackageApi,
//   fetchTravelItemVideosApi,
// } from "../../../redux/slices/Travel/TravelApiSlice.tsx";
import { type AppDispatch } from "../../../redux/store.ts";
import { LoaderFive } from "../../ui/Text/Loader.tsx";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../../Card/DraggableCard.tsx";
import { useTranslation } from "react-i18next";

interface PhotosTabProps {
  id: string;
}

export const PhotosTab = ({ id }: PhotosTabProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [zIndices, setZIndices] = useState<number[]>([]);
const { t } = useTranslation();

  const selectedTravelPackage = useSelectedTravelPackage(id);

  useEffect(() => {
    // dispatch(
    //   fetchSingleTravelPackageApi({
    //     itemId: id,
    //     select: "images",
    //   })
    // );
    // dispatch(
    //   fetchTravelItemVideosApi({
    //     itemId: id,
    //   })
    // );
  }, [dispatch, id]);

  // Initialize z-indices when media loads
  useEffect(() => {
    if (allMedia.length > 0) {
      setZIndices(Array(allMedia.length).fill(0));
    }
  }, [selectedTravelPackage]);

  const handleMediaClick = (index: number) => {
    // Create new array with incremented z-index for clicked item
    const newZIndices = [...zIndices];
    const maxZIndex = Math.max(...newZIndices, 0);
    newZIndices[index] = maxZIndex + 1;
    setZIndices(newZIndices);
  };

  if (!selectedTravelPackage) {
    return (
      <div className="bg-black/40 rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">
        <LoaderFive text="loading" />
      </div>
    );
  }

  // Combine images and videos for display
  const allMedia = [
    ...(selectedTravelPackage?.images?.map((image) => ({
      type: "image" as const,
      url: image,
      title: "Image",
    })) || []),
    ...(selectedTravelPackage?.videos?.allVideos?.map(
      (video: { thumbnail: any; awsUrl: any; title: any }) => ({
        type: "video" as const,
        url: video.thumbnail || video.awsUrl,
        title: video.title || "Video",
      })
    ) || []),
  ];

  return (
    <div className="bg-black/40 rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">
      <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 mb-4">
        {t("gallery")}
      </h2>

      <DraggableCardContainer className="relative flex min-h-[800px] w-full items-center justify-center overflow-clip">
        {allMedia.length > 0 ? (
          allMedia.map((media, index) => {
            // Define position classes based on index to create staggered layout
            const positionClasses = [
              "absolute top-20 left-[10%] rotate-[-5deg]",
              "absolute top-60 left-[25%] rotate-[-7deg]",
              "absolute top-40 left-[35%] rotate-[8deg]",
              "absolute top-45 left-[55%] rotate-[10deg]",
              "absolute top-80 right-[35%] rotate-[2deg]",
              "absolute top-24 left-[5%] rotate-[-7deg]",
              "absolute top-48 left-[30%] rotate-[4deg]",
            ];

            // Cycle through position classes or use a default if we have more items than classes
            const positionClass =
              positionClasses[index % positionClasses.length] ||
              "absolute top-20 left-1/2 -translate-x-1/2";

            // Determine z-index - active item gets higher z-index
            const zIndex = zIndices[index] || 0;

            return (
              <DraggableCardBody
                key={`${media.type}-${index}`}
                className={`${positionClass} cursor-pointer hover:scale-105 transition-transform`}
                style={{ zIndex }}
                onClick={() => handleMediaClick(index)}
              >
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt={media.title}
                    className="pointer-events-none relative h-80 w-80 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={media.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="pointer-events-none relative h-80 w-80 object-cover rounded-lg"
                  />
                )}
              </DraggableCardBody>
            );
          })
        ) : (
   <p className="text-center text-neutral-400 py-8">
        {t('noMediaAvailable')}
      </p>
        )}
      </DraggableCardContainer>
    </div>
  );
};
