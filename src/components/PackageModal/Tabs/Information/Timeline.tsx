"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  content: React.ReactNode;
  title?: string;
  designation?: string;
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
        <div className="max-w-7xl mx-auto py-4 px-4 md:px-8 lg:px-10">
          <h2 className="text-gray-100 text-4xl mb-4 text-gray-100 dark:text-white max-w-4xl">
            {title}
          </h2>
        </div>
      )}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex mt-2"
          >
            <div
              className={` ${item.title ? "sticky" : "hidden"} flex flex-col md:flex-row z-40 items-center self-start max-w-xs lg:max-w-sm md:w-full top-20 }`}
            >
              {item.title && (
                <div className="h-10 absolute left-3 md:left-0 w-1 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
              )}
              <h3 className="block pl-7 md:text-2xl text-lg px-1 font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
              <h3 className="block pl-6  md:text-2xl text-xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.designation}
              </h3>
            </div>

            <div className="relative md:pl-2 w-full pb-18">
              {item.content}{" "}
            </div>
          </div>
        ))}
          {data.some(item => item.title) && (
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-2 z-10 left-2 top-[-60px] md:top-40 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};
