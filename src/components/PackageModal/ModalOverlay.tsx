import { motion } from "motion/react";

interface ModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-20 bg-black/50 dark:bg-black/70 flex items-center justify-center"
    onClick={onClick}
  />
);

export default ModalOverlay;
