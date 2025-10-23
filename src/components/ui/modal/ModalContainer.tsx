import { motion } from "motion/react";
import { forwardRef } from "react";

interface ModalContainerProps {
  id?: string;
  children: React.ReactNode;
}

const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  ({ id, children }, ref) => (
    <motion.div
      ref={ref}
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
      className="fixed bottom-0 left-1/2 -translate-x-1/2
        w-full max-w-[1000px] mx-auto
        h-[100%] md:h-[100%] lg:h-[100%] lg:top-10 lg:bottom-auto
        z-30 rounded-t-3xl lg:rounded-3xl
        bg-white dark:bg-black/20 backdrop-blur-2xl
        overflow-hidden flex flex-col"
    >
      {children}
    </motion.div>
  )
);

export default ModalContainer;
