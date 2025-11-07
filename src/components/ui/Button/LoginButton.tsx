import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import { LogInIcon, LogOutIcon } from "lucide-react";

const LoginButton = ({ showText }: { showText?: boolean }) => {
  const { t } = useTranslation();
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  console.log(user);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (isAuthenticated) {
          logout({ logoutParams: { returnTo: window.location.origin } });
        } else {
          loginWithRedirect();
        }
      }}
      className={`w-full text-sm font-medium py-1.5 rounded text-white transition w-full py-2 text-base rounded-xl ${
        isAuthenticated ? "bg-red-500" : "bg-blue-500 "
      }`}
    >
      {isAuthenticated ? (
        <div className="flex justify-center gap-4 items-center">
          <LogOutIcon className="w-5 h-5" />
          {showText && t("logout")}

        </div>
      ) : (
        <div className="flex justify-center gap-4 items-center">
          <LogInIcon className="w-5 h-5" />
          {showText && t("login")}
        </div>
      )}
    </button>
  );
};

export default LoginButton;
