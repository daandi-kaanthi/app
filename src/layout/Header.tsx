import React from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageDropdown from "./languageSelector";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { LayoutTextFlip } from "../components/ui/Text/TextFlip";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex items-center justify-between w-full px-4 py-2 absolute top-0 z-20
                    backdrop-blur-md shadow-md rounded-b-lg h-12"
    >
      <motion.div className="relative flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
<img
  src="logonobg.png"
  className="h-10 w-10 dark:filter dark:brightness-0 dark:invert"
/>

  <LayoutTextFlip
          text={t("title")}
          words={[ "Daandi Kaanthi", "डांडी कांठि"]}
        />
      </motion.div>
      <div className="flex items-center gap-3">
        <LanguageDropdown />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
