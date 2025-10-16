import { motion } from "motion/react";

interface ModalImageProps {
  title: string;
  image?: string;
  id: string;
}

const ModalImage: React.FC<ModalImageProps> = ({ title, image, id }) => (
  <motion.div
    layoutId={`image-${title}-${id}`}
    className="w-full h-40 sm:h-56 md:h-64 lg:h-80 overflow-hidden rounded-t-2xl lg:rounded-t-3xl"
  >
    <img
      src={image || "https://via.placeholder.com/500x300"}
      alt={title}
      className="w-full h-full object-cover"
    />
  </motion.div>
);

export default ModalImage;
