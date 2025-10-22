
import SignUpForm from "../ui/Dialog/SignUpForm";
import { useState } from "react";
import LoginButton from "../ui/Button/LoginButton";

const SignupCard = ({loggedIn}:{loggedIn:boolean}) => {

  const [loginPopup, setLoginPopup] = useState(false);

  return (
    <div className="px-2 w-full text-center rounded-lg transition-colors duration-200  flex flex-col justify-center items-center gap-4">
      <LoginButton
        onClick={() => {
          loggedIn ? console.log("logout") : setLoginPopup(!loginPopup);
        }}
        loggedIn={loggedIn}
      />
      <SignUpForm
        open={loginPopup}
        onClose={() => setLoginPopup(!loginPopup)}
        onSubmit={() => console.log("data")}
      />
    </div>
  );
};

export default SignupCard;
