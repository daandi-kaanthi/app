import { motion } from "motion/react";
import { forwardRef, useState } from "react";
import TravelExplorer from "./HomeModalData";
import type { StoryGroup } from "../Card/StoriesCard";
import Stories from "../Card/StoriesCard";
import TungnathReview from "../../assets/tungnath.mp4";

interface ModalContainerProps {
  id: string;
  children: React.ReactNode;
}

const groups: StoryGroup[] = [
  {
    id: 1,
    title: "tungnath",
    thumbnail:
      "https://skaya-bucket.s3.us-east-1.amazonaws.com/tungnath/Tungnath+Rudraprayag+Uttarakhand+India.jpeg",

    stories: [
      { id: 1, type: "image", url: "https://skaya-bucket.s3.us-east-1.amazonaws.com/tungnath/Tungnath_Temple_in_winter.jpg", duration: 4000 },
      {
        id: 2,
        type: "video",
        url: TungnathReview
      },
    ],
  },
  {
    id: 2,
    title: "kedarnath",
    thumbnail: "https://skaya-bucket.s3.us-east-1.amazonaws.com/Kedarnath/Kedarnath+Dham.jpg",
    stories: [
      { id: 1, type: "image", url: "https://skaya-bucket.s3.us-east-1.amazonaws.com/Kedarnath/rishu-bhosale-8Y0Ql4SjGfY-unsplash.jpg" },
      { id: 2, type: "image", url: "https://skaya-bucket.s3.us-east-1.amazonaws.com/Kedarnath/pexels-ravikant-14102698.jpg" },
      { id: 3, type: "image", url: "https://skaya-bucket.s3.us-east-1.amazonaws.com/Kedarnath/pexels-soubhagya23-18915949.jpg" },
    ],
  },
];
      
      
const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  ({ id, children }, ref) => {
    const [activeStory, setActiveStory] = useState<StoryGroup | null>(null);

    const dragConstraints = {
      top: 60,
      bottom: 550,
    };

    const handleDragEnd = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: { offset: { y: number }; velocity: { y: number } }
    ) => {
      const dragThreshold = 80;
      if (info.offset.y > dragThreshold || info.velocity.y > 500) {
        console.log("Modal drag-closed");
      }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest(
          "div, img, video, canvas, input, textarea, [draggable='true']"
        ) ||
        (target instanceof HTMLElement &&
          target.scrollHeight > target.clientHeight);
      if (isInteractive) e.stopPropagation();
    };

    return (
      <motion.div
        ref={ref}
        layoutId={`card-${id}`}
        initial={{ y: "100%", opacity: 0 }} // Start from bottom
        animate={{
          y: id ? "20%" : "60%",
          opacity: 1,
        }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        }}
        drag="y"
        dragElastic={0.1}
        dragConstraints={dragConstraints}
        onDragEnd={handleDragEnd}
        className="absolute bottom-0 left-1/2 -translate-x-1/2
          w-full max-w-[1000px] mx-auto
          h-[100%] md:h-[100%] lg:h-[100%] lg:top-10 lg:bottom-auto
          z-30 rounded-t-3xl lg:rounded-3xl
          bg-white dark:bg-black/20 backdrop-blur-2xl
          overflow-hidden flex flex-col"
      >
        {/* Drag Handle */}
        <div className="sticky top-0 z-10 min-h-[100px]">
          <div className="flex justify-center pt-3 pb-0 cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
          <TravelExplorer id={id} />
        </div>
        {!id && (
          <Stories
            storyGroups={groups}
            activeGroup={activeStory}
            setActiveGroup={setActiveStory}
          />
        )}
        <div
          onPointerDownCapture={handlePointerDown}
          className="flex-1 overflow-y-auto"
        >
          {children}
        </div>
      </motion.div>
    );
  }
);

export default ModalContainer;
