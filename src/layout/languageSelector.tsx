import React from "react";
import { useTranslation } from "react-i18next";

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="
        border-2 border-gray-300 dark:border-gray-600
        bg-white dark:bg-black/40
        text-black dark:text-white
        rounded-lg p-2
        focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600
        transition-colors duration-200
      "
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="es">Español</option>
    </select>
  );
};

export default LanguageDropdown;
