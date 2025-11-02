import { motion, useMotionValue, animate } from "motion/react";
import { forwardRef, useEffect } from "react";

interface ModalContainerProps {
  id: string;
  children: React.ReactNode;
}

const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  ({ id, children }, ref) => {
    const y = useMotionValue(0);

    // On mount or when `id` changes, open modal at half screen height
    useEffect(() => {
      const initialY = id? window.innerHeight * 0.5: window.innerHeight * 0.7; // middle of screen
      animate(y, initialY, { type: "spring", stiffness: 250, damping: 25 });
    }, [id]);

    const dragConstraints = {
      // In a "translate Y" context, a negative constraint means it can be dragged *up*
      // from its starting animated position (10%) up to the top of the screen (0% or 0px).
      top: 80, // Allow dragging up to y=0 (or less, depending on where it sits)
      // A positive constraint means it can be dragged *down*.
      // Using a large number allows the drag to go far enough to trigger a close action.
      bottom: 550,
    };

    // Function to handle the end of the drag gesture
    const handleDragEnd = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: {
        point: { x: number; y: number };
        delta: { x: number; y: number };
        velocity: { x: number; y: number };
        offset: { x: number; y: number };
      }
    ) => {
      const dragThreshold = 80;

      if (info.offset.y > dragThreshold || info.velocity.y > 500) {
        console.log(
          "Modal drag-closed: Trigger navigation away from /package/:id/:title/:tab"
        );
      }
    };
    const handlePointerDown = (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;

      // Allow dragging inside elements that are draggable or scrollable
      const isInteractive =
        target.closest("div, img, video, canvas, input, textarea, [draggable='true']") ||
        (target instanceof HTMLElement && target.scrollHeight > target.clientHeight);

      if (isInteractive) {
        e.stopPropagation(); // stop modal drag only for these cases
      }
    };
    return (
      <motion.div
        ref={ref}
        style={{ y }}
        layoutId={`card-${id}`}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "10%", opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        }}
        // --- Added Drag Properties ---
        drag="y" // Only allow dragging along the Y-axis
        dragElastic={0.1} // A little elasticity when hitting the bounds
        dragConstraints={dragConstraints} // The limits for dragging
        onDragEnd={handleDragEnd} // Function to check if it should close after the drag ends
        // --- End Drag Properties ---
        className="absolute bottom-0 left-1/2 -translate-x-1/2
          w-full max-w-[1000px] mx-auto
          h-[100%] md:h-[100%] lg:h-[100%] lg:top-10 lg:bottom-auto
          z-30 rounded-t-3xl lg:rounded-3xl
          bg-white dark:bg-black/20 backdrop-blur-2xl
          overflow-hidden flex flex-col"
      >
        {/* Drag Handle */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/40 backdrop-blur-sm">
          <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
        </div>
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
