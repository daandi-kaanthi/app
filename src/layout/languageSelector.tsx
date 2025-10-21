import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const languages = [
  { name: "English", value: "en" },
  { name: "हिंदी", value: "hi" },
  // { name: "Español", value: "es" },
  { name: "Marathi", value: "mr" },
];

export const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    
    // Update URL with new language
    const params = new URLSearchParams(location.search);
    params.set('lang', lang);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };
  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="
        border-2 border-gray-300 dark:border-gray-700
        bg-white dark:bg-neutral-900
        text-gray-800 dark:text-gray-100
        rounded-lg px-3 py-2
        shadow-sm dark:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
        transition-all duration-200 ease-in-out
      "
    >
      {languages.map((lang) => (
        <option
          key={lang.value}
          value={lang.value}
          className="bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
        >
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageDropdown;
