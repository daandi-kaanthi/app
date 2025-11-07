import { motion, useAnimation } from "motion/react";
import { forwardRef, useEffect } from "react";

interface ModalContainerProps {
  id: string;
  children: React.ReactNode;
}

const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  ({ id, children }, ref) => {
    const controls = useAnimation();

    const dragConstraints = {
      top: 60,
      bottom: 650,
    };

    // Reset modal to center when id changes
    useEffect(() => {
      if (id) {
        controls.start({
          y: "20%",
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.5 },
        });
      }
    }, [id, controls]);

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
        initial={{ y: "50%", opacity: 0 }}
        animate={controls} // use animation controls
        exit={{ y: "100%", opacity: 0 }}
        drag="y"
        dragElastic={0.1}
        dragConstraints={dragConstraints}
        onDragEnd={handleDragEnd}
        className="absolute bottom-0 left-1/2 -translate-x-1/2
          w-full max-w-[1000px] mx-auto
          h-[100%] md:h-[100%] lg:h-[100%] lg:top-10 lg:bottom-auto
          z-30 rounded-t-3xl lg:rounded-3xl
          bg-white dark:bg-black/90 backdrop-blur-2xl
           flex flex-col pb-20"
      >
        {/* Drag Handle */}
        <div className="sticky top-0 z-10">
          <div className="flex justify-center pt-3 pb-0 cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
        </div>
        <div
          onPointerDownCapture={handlePointerDown}
          className="
            flex-1 overflow-y-auto 
            scroll-smooth
            scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600
            px-1 pb-40
          "
        >
          {children}
        </div>
      </motion.div>
    );
  }
);

export default ModalContainer;
