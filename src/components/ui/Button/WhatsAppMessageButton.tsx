// components/WhatsAppMessageButton.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface WhatsAppMessageButtonProps {
  title: string;
  date: number; // Unix timestamp
}

export const WhatsAppMessageButton: React.FC<WhatsAppMessageButtonProps> = ({
  title,
  date,
}) => {
  const { t } = useTranslation();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP; // e.g., "+911234567890"

  const handleSendMessage = () => {
    const formattedDate = new Date(date * 1000).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Use i18n for message template
    const message = t("whatsappMessage", { title, date: formattedDate });

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleSendMessage}
      className="max-w-[150px] px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
    >
      {t("contactViaWhatsApp")}
    </button>
  );
};
