import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { Send, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface StoryItem {
  id: number;
  type: "image" | "video";
  url: string;
  duration?: number;
  caption?: string;
  timestamp?: Date;
}

export interface StoryGroup {
  id: number;
  title: string;
  thumbnail: string;
  stories: StoryItem[];
  seen?: boolean;
}

interface StoriesProps {
  storyGroups: StoryGroup[];
  activeGroup: StoryGroup | null;
  setActiveGroup: (group: StoryGroup | null) => void;
  onReply?: (groupId: number, storyId: number, message: string) => void;
}

const Stories: React.FC<StoriesProps> = ({
  storyGroups,
  activeGroup,
  setActiveGroup,
  onReply,
}) => {
  const { t } = useTranslation();
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number | null>(
    null
  );
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const replyInputRef = useRef<HTMLInputElement | null>(null);

  // --- Handle opening and closing ---
  useEffect(() => {
    if (activeGroup) {
      document.body.style.overflow = "hidden";
      const gIndex = storyGroups.findIndex((g) => g.id === activeGroup.id);
      setCurrentGroupIndex(gIndex);
      setCurrentStoryIndex(0);
      setProgress(0);
      setIsPaused(false);
      setShowReplyBox(false);
      setReplyText("");

      window.history.pushState({ storyOpen: true }, "");
      const handlePop = () => setActiveGroup(null);
      window.addEventListener("popstate", handlePop);

      return () => {
        window.removeEventListener("popstate", handlePop);
        document.body.style.overflow = "";
        clearInterval(progressInterval.current || undefined);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activeGroup, storyGroups, setActiveGroup]);

  // --- Controls ---
  const handleClose = useCallback(() => {
    setActiveGroup(null);
    if (window.history.state?.storyOpen) window.history.back();
  }, [setActiveGroup]);

  const handleNextGroup = useCallback(() => {
    if (currentGroupIndex === null) return;
    const next = currentGroupIndex + 1;
    if (next < storyGroups.length) {
      setActiveGroup(storyGroups[next]);
    } else {
      handleClose();
    }
  }, [currentGroupIndex, storyGroups, setActiveGroup, handleClose]);

  const handlePrevGroup = useCallback(() => {
    if (currentGroupIndex === null) return;
    const prev = currentGroupIndex - 1;
    if (prev >= 0) {
      setActiveGroup(storyGroups[prev]);
    } else {
      handleClose();
    }
  }, [currentGroupIndex, storyGroups, setActiveGroup, handleClose]);

  const handleNextStory = useCallback(() => {
    if (activeGroup && currentStoryIndex < activeGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      handleNextGroup();
    }
  }, [activeGroup, currentStoryIndex, handleNextGroup]);

  const handlePrevStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else {
      handlePrevGroup();
    }
  }, [currentStoryIndex, handlePrevGroup]);

  // --- Progress bar and auto-next logic ---
  useEffect(() => {
    if (!activeGroup || currentGroupIndex === null) {
      clearInterval(progressInterval.current || undefined);
      return;
    }

    const currentStory = activeGroup.stories[currentStoryIndex];
    if (!currentStory) return;

    // Helper to start the progress after knowing duration
    const startProgress = (durationMs: number) => {
      clearInterval(progressInterval.current || undefined);

      const incrementAmount = 100 / (durationMs / 50); // Update every 50ms
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval.current || undefined);
            setTimeout(() => handleNextStory(), 0);
            return 100;
          }
          return Math.min(prev + incrementAmount, 100);
        });
      }, 50);
    };

    // For image
    if (currentStory.type === "image") {
      startProgress(currentStory.duration || 5000);
      return;
    }

    // For video
    const videoEl = videoRef.current;
    if (videoEl) {
      // Wait for metadata to load before getting duration
      const handleLoadedMetadata = () => {
        const durationMs = (videoEl.duration || 6) * 1000;
        startProgress(durationMs);
      };

      if (videoEl.readyState >= 1) {
        handleLoadedMetadata();
      } else {
        videoEl.addEventListener("loadedmetadata", handleLoadedMetadata, {
          once: true,
        });
      }

      return () => {
        videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
        clearInterval(progressInterval.current || undefined);
      };
    }
  }, [activeGroup, currentStoryIndex, currentGroupIndex, handleNextStory]);

  // Pause or resume progress when paused/played
useEffect(() => {
  if (isPaused) {
    if (videoRef.current) videoRef.current.pause();
    clearInterval(progressInterval.current || undefined);
  } else {
    if (videoRef.current && currentStory?.type === "video") {
      videoRef.current.play().catch(() => {
        videoRef.current!.muted = true;
        setIsMuted(true);
        videoRef.current!.play();
      });
    }

    // Resume progress
    if (activeGroup) {
      const currentStory = activeGroup.stories[currentStoryIndex];
      if (currentStory) {
        const durationMs =
          currentStory.type === "video"
            ? (videoRef.current?.duration || 6) * 1000
            : currentStory.duration || 5000;

        const incrementAmount = 100 / (durationMs / 50);
        clearInterval(progressInterval.current || undefined);
        progressInterval.current = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval.current || undefined);
              setTimeout(() => handleNextStory(), 0);
              return 100;
            }
            return Math.min(prev + incrementAmount, 100);
          });
        }, 50);
      }
    }
  }

  return () => clearInterval(progressInterval.current || undefined);
}, [isPaused]);


  // --- Pause when tab hidden ---
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
        videoRef.current?.pause();
      } else {
        setIsPaused(false);
        videoRef.current?.play();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // --- Handle video playback ---
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Auto-play failed, mute and try again
          videoRef.current!.muted = true;
          setIsMuted(true);
          videoRef.current!.play();
        });
      }
    }
  }, [isPaused, isMuted, currentStoryIndex]);

  // --- Touch/Mouse handlers for pause on hold ---
  const handlePressStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      const timer = setTimeout(() => {
        setIsPaused(true);
      }, 200);
      setLongPressTimer(timer);

      if ("touches" in e) {
        setTouchStartX(e.touches[0].clientX);
      }
    },
    []
  );

  const handlePressEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setIsPaused(false);
    setTouchStartX(null);
  }, [longPressTimer]);

  // --- Swipe to change groups ---
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX === null) return;

      const touchEndX = e.touches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 100) {
        if (diff > 0) {
          handleNextGroup();
        } else {
          handlePrevGroup();
        }
        setTouchStartX(null);
      }
    },
    [touchStartX, handleNextGroup, handlePrevGroup]
  );

  // --- Reply functionality ---
  const handleSendReply = useCallback(() => {
    if (replyText.trim() && activeGroup && onReply) {
      const currentStory = activeGroup.stories[currentStoryIndex];
      if (currentStory) {
        onReply(activeGroup.id, currentStory.id, replyText);
        setReplyText("");
        setShowReplyBox(false);
      }
    }
  }, [replyText, activeGroup, currentStoryIndex, onReply]);

const handleSendWhatsApp = useCallback(() => {
  const phone = import.meta.env.VITE_CONTACT_PHONE;

  if (!phone) {
    console.error("WhatsApp phone number is not set in environment variables");
    return;
  }

  // If user typed a reply, use that; else use the default translation
  const messageText = replyText.trim()
    ? replyText.trim()
    : t("whatsappMessageCustom", {
        location: t(`stories.titles.${activeGroup?.title}`),
      });

  const message = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
  window.open(whatsappUrl, "_blank");
}, [replyText, activeGroup, t]);

  // --- Keyboard controls ---
  useEffect(() => {
    if (!activeGroup) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          handleNextStory();
          break;
        case "ArrowLeft":
          handlePrevStory();
          break;
        case "Escape":
          handleClose();
          break;
        case " ":
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
        case "m":
        case "M":
          setIsMuted((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGroup, handleNextStory, handlePrevStory, handleClose]);

  // Focus reply input when shown
  useEffect(() => {
    if (showReplyBox && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [showReplyBox]);

  const currentStory = activeGroup?.stories[currentStoryIndex];

  // --- Fullscreen Story Viewer ---
  const fullscreenContent = (
    <AnimatePresence>
      {activeGroup && currentStory && (
        <motion.div
          key={activeGroup.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
          onTouchMove={handleTouchMove}
        >
          {/* Progress Bars */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-3 z-10">
            {activeGroup.stories.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
              >
                {i === currentStoryIndex ? (
                  <motion.div
                    className="h-full bg-white"
                    style={{ width: `${progress}%` }}
                  />
                ) : (
                  <div
                    className={`h-full ${
                      i < currentStoryIndex ? "bg-white" : "bg-transparent"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-5 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <img
                  src={activeGroup.thumbnail}
                  alt={activeGroup.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-semibold text-sm drop-shadow-lg">
                {t(`stories.titles.${activeGroup.title}`)}
              </span>
              {currentStory.timestamp && (
                <span className="text-white/70 text-xs">
                  {formatTimestamp(currentStory.timestamp)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {isPaused ? (
                <Play
                  size={20}
                  className="text-white cursor-pointer drop-shadow-lg"
                  onClick={() => setIsPaused(false)}
                />
              ) : (
                <Pause
                  size={20}
                  className="text-white cursor-pointer drop-shadow-lg"
                  onClick={() => setIsPaused(true)}
                />
              )}
              {currentStory.type === "video" && (
                <>
                  {isMuted ? (
                    <VolumeX
                      size={20}
                      className="text-white cursor-pointer drop-shadow-lg"
                      onClick={() => setIsMuted(false)}
                    />
                  ) : (
                    <Volume2
                      size={20}
                      className="text-white cursor-pointer drop-shadow-lg"
                      onClick={() => setIsMuted(true)}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Tap Areas for navigation */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-[1]"
            onClick={handlePrevStory}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-[1]"
            onClick={handleNextStory}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
          />

          {/* Current story display */}
          <div className="relative w-full h-full flex items-center justify-center">
            {currentStory.type === "video" ? (
              <video
                ref={videoRef}
                key={currentStory.url}
                src={currentStory.url}
                autoPlay
                playsInline
                muted={isMuted}
                controls={false}
                onEnded={handleNextStory}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <motion.img
                key={currentStory.url}
                src={currentStory.url}
                alt="Story"
                className="max-w-full max-h-full object-contain"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </div>

          {/* Caption */}
          {currentStory.caption && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-24 left-4 right-4 text-white text-sm bg-black/30 backdrop-blur-sm p-3 rounded-lg"
            >
              {currentStory.caption}
            </motion.div>
          )}

          {/* Bottom Actions */}
          <div className="absolute bottom-6 left-4 right-4 z-10 space-y-3">
            {/* Reply/Inquiry Box */}
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/20 flex items-center gap-2">
                <input
                  ref={replyInputRef}
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && replyText.trim())
                      handleSendReply();
                  }}
                  placeholder={t("contactViaWhatsApp")}
                  className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-sm"
                  onClick={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                />
              </div>
              <button
                onClick={handleSendWhatsApp}
                className={`bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 transition-all opacity-100 scale-100 hover:scale-105`}
              >
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // --- Story Thumbnails ---
  return (
    <>
      <div className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide">
        {storyGroups.map((group) => (
          <div
            key={group.id}
            className="flex flex-col items-center cursor-pointer flex-shrink-0"
            onClick={() => setActiveGroup(group)}
          >
            <div
              className={`w-20 h-20 rounded-full p-[3px] ${
                group.seen
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-neutral-900 border-2 border-white dark:border-neutral-900">
                <img
                  src={group.thumbnail}
                  alt={group.title}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                />
              </div>
            </div>
            <div className="text-xs text-center text-gray-700 dark:text-gray-300 mt-1 w-20 truncate">
              {t(`stories.titles.${group.title}`)}
            </div>
          </div>
        ))}
      </div>

      {createPortal(fullscreenContent, document.body)}
    </>
  );
};

// Helper function to format timestamp
function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else {
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }
}

export default Stories;
