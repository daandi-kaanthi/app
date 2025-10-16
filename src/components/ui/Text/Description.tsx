import {  motion } from "motion/react";

interface DescriptionProps {
  description: string;
  className?: string;
}

export const Description = ({
  description,
  className = "",
}: DescriptionProps) => {
  return (
    <motion.p
      layoutId={`description-${description}`}
      className={`text-neutral-700 dark:text-neutral-300 text-center ${className}`}
    >
      {description}
    </motion.p>
  );
};
