"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  content: React.ReactNode;
  title?: React.ReactNode;
}

export const Timeline = ({
  data,
  title,
}: {
  data: TimelineEntry[];
  title?: string;
  stickyTop?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-4" ref={containerRef}>
      {title && (
        <div className="max-w-7xl mx-auto py-4 px-4 md:px-8 ">
          <h2 className="text-gray-100 text-4xl mb-4 text-gray-100 dark:text-white max-w-4xl">
            {title}
          </h2>
        </div>
      )}
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start mb-20">
            <div
              className={`${
                item.title ? "sticky" : "hidden"

              } w-[200px] flex md:flex-row z-40 items-center self-start max-w-xs lg:max-w-sm md:w-full top-2`}
            >
              {item.title && (
                <div className="h-10 absolute left-2 md:left-2 w-1 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
              )}
                {item.title}
            </div>

            <div className="relative pl-4 md:pl-8 w-full">
              {item.content}
            </div>
          </div>
        ))}
        {data.some((item) => item.title) && (
          <div
            style={{ height: height + "px" }}
            className="absolute left-2 md:left-2 top-0 z-40 pointer-events-none
             overflow-hidden w-[2px]
             bg-gradient-to-b from-transparent via-neutral-300/50 dark:via-neutral-600/40 to-transparent
             [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0 w-[2px] z-50 bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};