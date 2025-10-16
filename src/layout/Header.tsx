import React from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageDropdown from "./languageSelector";
import { useTranslation } from "react-i18next";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 absolute top-0 z-20
                    backdrop-blur-md shadow-md rounded-b-lg h-12">
      <h1 className="text-xl font-extrabold text-black dark:text-white tracking-tight">
        {t("title")}
      </h1>
      <div className="flex items-center gap-3">
        <LanguageDropdown />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
