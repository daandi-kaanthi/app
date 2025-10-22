// components/WhatsAppMessageButton.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
// import { useActiveAccount } from "thirdweb/react";
// import { ConenctWalletButton } from "./ThirdwebLoginButton";
// import ModalOverlay from "../../PackageModal/ModalOverlay";
// import ModalContainer from "../../PackageModal/ModalContainer";
// import ModalHeader from "../../PackageModal/ModalHeader";

interface WhatsAppMessageButtonProps {
  title: string;
  date: number; // Unix timestamp
}

export const WhatsAppMessageButton: React.FC<WhatsAppMessageButtonProps> = ({
  title,
  date,
}) => {
  const { t } = useTranslation();
  const whatsappNumber = import.meta.env.VITE_CONTACT_PHONE;
  // const account = useActiveAccount();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    // ✅ If wallet not connected → open connect wallet modal
    // if (!account?.address) {
    //   setIsModalOpen(true);
    //   return;
    // }

    // ✅ Wallet connected → send WhatsApp message
    const formattedDate = new Date(date * 1000).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const message = t("whatsappMessage", { title, date: formattedDate });
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  // const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={handleSendMessage}
        className="max-w-[150px] px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
      >
        {t("contactViaWhatsApp")}
      </button>

      {/* ✅ Show modal if wallet is not connected */}
      {/* {isModalOpen && (
        <div className="">
          <ModalOverlay onClick={closeModal} />
          <ModalContainer ref={modalRef} id="connect-wallet-modal">
            <ModalHeader onClose={closeModal} />
            <div className="p-4 flex flex-col justify-center items-center z-50">
              <p className="mb-4 text-sm">
                To continue, please connect your web3 wallet.
              </p>
              <ConenctWalletButton />
            </div>
          </ModalContainer>
        </div>
      )} */}
    </>
  );
};
