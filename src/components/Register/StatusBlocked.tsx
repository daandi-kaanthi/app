import { useTranslation } from "react-i18next";
import { WhatsAppMessageButton } from "../ui/Button/WhatsAppMessageButton";

// src/components/SignUpPage/StatusBlocked.tsx
const StatusBlocked = ({ status }: { status: string }) => {

  const {t} =useTranslation()
  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-[100vh]">
      <h1 className="text-2xl font-bold text-red-600">
        Your account is {status.toUpperCase()}
      </h1>
      <p className="text-gray-600 mt-2">
        Please contact support for more information.
      </p>
      <WhatsAppMessageButton
        phone={import.meta.env.VITE_CONTACT_SALES_PHONE}
        message={"message"}
        buttonText={t("contactViaWhatsApp")}
      />
    </div>
  );
};

export default StatusBlocked;
