import { useTranslation } from "react-i18next";

const LoginButton = ({ onClick, loggedIn }: any) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`w-full text-sm font-medium py-1.5 rounded  text-white transition ${loggedIn ? "bg-red-500" : "bg-blue-500"}`}
    >
      {/* todo add login logout i18n */}
      {loggedIn ? t("logout") : t("login")}
    </button>
  );
};

export default LoginButton;
