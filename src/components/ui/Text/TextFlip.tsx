"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../../lib/utils";

export const LayoutTextFlip = ({
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 5000,
  initialDelay = 4000,
}: {
  text: string;
  words: string[];
  duration?: number;
  initialDelay?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, duration);

      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(timeout);
  }, [duration, initialDelay, words.length]);

  return (
    <motion.span
      layout
      className="relative w-fit overflow-hidden px-0 py-2 font-sans text-xl font-bold tracking-tight text-black md:text-2xl  dark:text-white"
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          initial={{ y: -40, filter: "blur(10px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={cn("inline-block whitespace-nowrap")}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};
