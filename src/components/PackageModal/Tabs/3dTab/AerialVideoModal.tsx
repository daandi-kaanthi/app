import React from "react";

interface AerialVideoModalProps {
  placeName: string;
  open: boolean;
  onClose: () => void;
}

const AerialVideoModal: React.FC<AerialVideoModalProps> = ({
  placeName,
  open,
  onClose,
}) => {
  if (!open) return null;

  // Build YouTube embed URL
  const query = encodeURIComponent(`${placeName} aerial drone 4K`);
  const youtubeUrl = `https://www.youtube.com/embed?listType=search&list=${query}&autoplay=1&mute=1`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={youtubeUrl}
          title={`${placeName} aerial video`}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="w-full h-full"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AerialVideoModal;
