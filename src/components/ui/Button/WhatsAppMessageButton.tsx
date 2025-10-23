// components/WhatsAppMessageButton.tsx
"use client";

import React from "react";

interface WhatsAppMessageButtonProps {
  phone: string;
  message: string;
  buttonText:string
}

export const WhatsAppMessageButton: React.FC<WhatsAppMessageButtonProps> = ({
  phone,
  message,
  buttonText
}) => {

  const handleSendMessage = () => {
    // ✅ Use custom message if provided, otherwise fallback to i18n template
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };
  return (
    <button
      onClick={handleSendMessage}
      className="max-w-[150px] px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
    >
      {buttonText}
    </button>
  );
};
