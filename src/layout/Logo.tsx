import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { LayoutTextFlip } from "../components/ui/Text/TextFlip";
import { useNavigate } from "react-router-dom";

interface LogoProps {}

const HomeLogo: React.FC<LogoProps> = () => {
  const { t } = useTranslation();
  const navigate=useNavigate()

  return (
    <div
      className="flex items-center justify-between w-full z-20"
      onClick={()=>navigate("/")}
    >
      <motion.div className="relative flex flex-row items-center justify-center gap-2 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <img
          src="/logonobg.png"
          className="h-10 w-10 dark:filter dark:brightness-0 dark:invert"
        />

        <LayoutTextFlip
          text={t("title")}
          words={[
            t("title"),
            "Daandi Kaanthi",
            "डांडी कांठि", // Hindi
            "ડાંડી કાંઠી", // Gujarati
            "ಡಾಂಡಿ ಕಾಂಠಿ", // Kannada
            "ഡാണ്ടി കാന്തി", // Malayalam
            "ਡਾਂਡੀ ਕਾਂਠੀ", // Punjabi
            "ଡାଣ୍ଡି କାଠି", // Odia
            "டாண்டி காந்தி", // Tamil
            "డాండీ కాంతి", // Telugu
            "ডান্ডি কান্তি", // Bengali
            "डांडी कांठी", // Marathi
            "डांडी कांठी", // Nepali (same script as Hindi)
            "डांडी कांठी", // Sanskrit
            "ਡਾਂਡੀ ਕਾਂਠੀ", // Gurmukhi (Punjabi script)
          ]}
        />
      </motion.div>
    </div>
  );
};

export default HomeLogo;
