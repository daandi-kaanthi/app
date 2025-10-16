import React from "react";

interface CubeProps {
  value: number;
}

const Cube: React.FC<CubeProps> = ({ value }) => {
  const getTileStyle = (val: number) => {
    const styles: Record<number, { bg: string; text: string; size: string }> = {
      0: { bg: "bg-amber-100/40 dark:bg-amber-900/20", text: "text-transparent", size: "text-4xl" },
      2: { bg: "bg-amber-50 dark:bg-amber-900", text: "text-amber-900 dark:text-amber-100", size: "text-4xl" },
      4: { bg: "bg-amber-100 dark:bg-amber-800", text: "text-amber-900 dark:text-amber-50", size: "text-4xl" },
      8: { bg: "bg-orange-300 dark:bg-orange-700", text: "text-white dark:text-orange-50", size: "text-4xl" },
      16: { bg: "bg-orange-400 dark:bg-orange-600", text: "text-white", size: "text-4xl" },
      32: { bg: "bg-orange-500 dark:bg-orange-500", text: "text-white", size: "text-4xl" },
      64: { bg: "bg-red-500 dark:bg-red-600", text: "text-white", size: "text-4xl" },
      128: { bg: "bg-yellow-400 dark:bg-yellow-500", text: "text-white", size: "text-3xl" },
      256: { bg: "bg-yellow-500 dark:bg-yellow-600", text: "text-white", size: "text-3xl" },
      512: { bg: "bg-yellow-600 dark:bg-yellow-700", text: "text-white", size: "text-3xl" },
      1024: { bg: "bg-yellow-500 dark:bg-yellow-600", text: "text-white", size: "text-2xl" },
      2048: { bg: "bg-yellow-600 dark:bg-yellow-700", text: "text-white", size: "text-2xl" },
    };
    return styles[val] || { bg: "bg-amber-800 dark:bg-amber-700", text: "text-white", size: "text-xl" };
  };

  const style = getTileStyle(value);

  return (
    <div
      className={`
        ${style.bg} ${style.text} ${style.size}
        flex items-center justify-center 
        font-black tracking-tight
        rounded-lg shadow-md
        transition-all duration-200
        aspect-square w-full
        border-2 border-amber-700 dark:border-amber-300
        ${value !== 0 ? "scale-100" : "scale-95"}
      `}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Cube