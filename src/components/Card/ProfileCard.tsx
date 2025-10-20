"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  type JSX,
} from "react";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { CloseIcon } from "../ui/Icons/CloseIcon";
import SignupCard from "./SignUpCard";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  loggedIn: boolean;
}

type Card = {
  title: string;
  category: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const ProfileCarasoul = ({
  items,
  initialScroll = 0,
  loggedIn,
}: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex  w-full overflow-y-scroll overscroll-y-auto scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
        >
          <div
            className={cn(
              "w-full flex flex-col justify-center py-16",
              "mx-auto max-w-7xl" // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {loggedIn && (
              <>
                {items.map((item, index) => (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.2 * index,
                        ease: "easeOut",
                      },
                    }}
                    key={"card" + index}
                    className="rounded-3xl last:pr-[5%] md:last:pr-[33%] flex justify-center py-2"
                  >
                    {item}
                  </motion.div>
                ))}
              </>
            )}
            <SignupCard loggedIn={loggedIn} />
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const ProfileCard = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    function onPopState() {
      if (open) {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      window.history.pushState({ cardOpen: true }, ""); // push state when card opens
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen mt-2 w-full overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-black"
            >
              <button
                className="sticky top-12 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <CloseIcon />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
              >
                {card.title}
              </motion.p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


   
       
      <div className="flex justify- w-full  mx-4">
        <h2
          onClick={handleOpen}
          className={`w-full text-sm font-medium py-1.5 rounded`}
        >
          {card.category} :
        </h2>
        <h2
          onClick={handleOpen}
          className={`w-full text-sm font-medium py-1.5 rounded `}
        >
          {card.title}
        </h2>
      </div>
    
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: any) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
