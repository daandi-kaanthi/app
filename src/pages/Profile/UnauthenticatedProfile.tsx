"use client";
import HomeLogo from "../../layout/Logo";
import LoginButton from "../../components/ui/Button/LoginButton";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../../layout/languageSelector";

interface UnauthenticatedProfileProps {
  getShowSkip?: boolean;
  onShowSkipButton?: () => void;
}

export function UnauthenticatedProfile({
  getShowSkip = false,
  onShowSkipButton,
}: UnauthenticatedProfileProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-primary text-black dark:text-white">{t("welcomeTo")}</h1>
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-4">
          <HomeLogo />
          <LanguageDropdown />
        </div>
      </div>

      <p className="text-muted-foreground text-lg text-center max-w-md text-black dark:text-white">
        {t("loginNow")}
      </p>

      <div className="w-full max-w-md flex items-center justify-center gap-3">
        <div className="flex-1">
          <LoginButton showText={true}/>
        </div>

        {getShowSkip && (
          <button
            onClick={onShowSkipButton}
            className="flex-1 py-2 text-base rounded-xl border border-muted-foreground text-muted-foreground hover:bg-muted-foreground/10 transition w-full text-black dark:text-white"
          >
            {t("skipForNow")}
          </button>
        )}
      </div>
    </div>
  );
}
