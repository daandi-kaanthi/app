"use client";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import React from "react";
import { useOutsideClick } from "./useOutSideClick";
import { cn } from "../../../lib/utils";
import { useTranslation } from "react-i18next";

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

const SignUpDialog: React.FC<ContactDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const ref = useOutsideClick(onClose);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;
    onSubmit({ name, email, message });
    form.reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={ref}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "bg-white dark:bg-neutral-900 rounded-xl p-6 w-[90%] max-w-md shadow-xl border",
              "border-gray-200 dark:border-gray-700"
            )}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold dark:text-white">
                {t("contactUs")}
              </h2>
              <button onClick={onClose}>
                <X className="h-5 w-5 text-gray-500 hover:text-black dark:hover:text-white" />
              </button>
            </div>

            {/* Move form outside */}
            <SignUpForm onSubmit={handleFormSubmit} t={t} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ContactFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  t: (key: string) => string;
}

export const SignUpForm: React.FC<ContactFormProps> = ({ onSubmit, t }) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="text-sm block mb-1 dark:text-gray-300">
          {t("fullName")}
        </label>
        <input
          name="name"
          type="text"
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-600 dark:text-white"
          placeholder={t("enterName")}
        />
      </div>

      <div>
        <label className="text-sm block mb-1 dark:text-gray-300">
          {t("email")}
        </label>
        <input
          name="email"
          type="email"
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-600 dark:text-white"
          placeholder={t("enterEmail")}
        />
      </div>

      <div>
        <label className="text-sm block mb-1 dark:text-gray-300">
          {t("message")}
        </label>
        <textarea
          name="message"
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-600 dark:text-white"
          placeholder={t("writeMessage")}
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
      >
        {t("submit")}
      </button>
    </form>
  );
};

export default SignUpDialog;
