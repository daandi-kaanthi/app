"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
} from "motion/react";
import { cn } from "../../lib/utils";

interface DraggableCardBodyProps {
  className?: string;
  children?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const DraggableCardBody = ({
  className,
  children,
  isActive = false,
  onClick,
}: DraggableCardBodyProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig,
  );

  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig,
  );

  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig,
  );

  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        });
      }
    };
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      drag
      dragConstraints={constraints}
      onDragStart={() => (document.body.style.cursor = "grabbing")}
      onDragEnd={() => (document.body.style.cursor = "default")}
      style={{
        rotateX,
        rotateY,
        opacity,
        zIndex: isActive ? 50 : 10,
        scale: isActive ? 1.1 : 1,
        transition: "all 0.3s ease",
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative min-h-40 w-60 overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl transform-3d dark:bg-neutral-950 cursor-pointer",
        className,
      )}
    >
      {children}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <div className={cn("[perspective:3000px]", className)}>{children}</div>;
};
