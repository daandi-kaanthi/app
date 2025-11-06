import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOutIcon } from "lucide-react";

const LoginButton = () => {
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
          {t("logout")}
          <LogOutIcon className="w-5 h-5"/>
        </div>
      ) : (
        t("login")
      )}
    </button>
  );
};

export default LoginButton;
