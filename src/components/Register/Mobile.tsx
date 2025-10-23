import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import {
  sendMobileOtp,
  verifyPhoneOtp,
} from "../../redux/slices/otpService/otpActions";
import { selectOtpTypeState } from "../../redux/slices/otpService/otpSlice";
import InputWithButton from "../ui/Input/InputWithButton";
import { OtpEnum } from "../../Datatypes/Enums/OtpEnum";

interface MobileProps {
  mobile: string;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
  mobileOtp: string;
  setMobileOtp: React.Dispatch<React.SetStateAction<string>>;
  mobileOtpCountdown: number;
  mobileCountdownActive: boolean;
  setMobileOtpCountdown: React.Dispatch<React.SetStateAction<number>>;
  setMobileCountdownActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const Mobile: React.FC<MobileProps> = ({
  mobile,
  setMobile,
  mobileOtp,
  setMobileOtp,
  mobileOtpCountdown,
  mobileCountdownActive,
  setMobileOtpCountdown,
  setMobileCountdownActive,
}) => {
  const authType = OtpEnum.AUTH;

  const dispatch = useDispatch<AppDispatch>();
  const otpState = useSelector(selectOtpTypeState(authType));
  const {
    isOtpVerified,
    isOtpSent,
    sendLoading,
    verifyLoading,
    sendError,
    verifyError,
    trxId,
  } = otpState;

  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [mobileError, setMobileError] = useState("");

  const validateMobile = (mobile: string) => /^[0-9]{10}$/.test(mobile);

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleSendMobileOtp = () => {
    console.log(mobileError);

    if (!validateMobile(mobile)) {
      setMobileError("Invalid mobile number");
      return;
    }
    setMobileError("")
    dispatch(
      sendMobileOtp({ countryCode: "+91", phone: mobile, type: authType })
    );
    setMobileOtpCountdown(10);
    setMobileCountdownActive(true);
  };

  const handleVerifyMobileOtp = () => {
    dispatch(
      verifyPhoneOtp({
        countryCode: "+91",
        phone: mobile,
        otp: mobileOtp,
        type: authType,
        trxId,
      })
    );
  };

  useEffect(() => {
    if (isOtpVerified) setIsMobileVerified(true);
  }, [isOtpVerified]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mobileOtpCountdown > 0 && mobileCountdownActive) {
      timer = setInterval(
        () => setMobileOtpCountdown((prev) => prev - 1),
        1000
      );
    } else setMobileCountdownActive(false);
    return () => clearInterval(timer);
  }, [mobileOtpCountdown, mobileCountdownActive]);

  return (
    <>
      <InputWithButton
        id="mobile"
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        label="Mobile Number"
        buttonText={
          isMobileVerified
            ? "OTP Verified"
            : isOtpSent
              ? mobileOtpCountdown > 0
                ? formatCountdown(mobileOtpCountdown)
                : "Resend OTP"
              : "Send OTP"
        }
        onButtonClick={handleSendMobileOtp}
        buttonDisabled={
          sendLoading || mobileCountdownActive || isMobileVerified
        }
        required
        helperText={
          // Sending OTP state
          sendLoading
            ? { type: "loading", message: "Sending OTP..." }
            : // Send OTP error
              mobileError
              ? { type: "error", message: mobileError }
              : sendError
                ? { type: "error", message: sendError }
                : // OTP sent successfully but not verified yet
                  isOtpSent && !isOtpVerified
                  ? { type: "success", message: "OTP sent successfully" }
                  : // Verify OTP state
                    verifyLoading
                    ? { type: "loading", message: "Verifying OTP..." }
                    : // Verify OTP error
                      verifyError
                      ? { type: "error", message: verifyError }
                      : // OTP verified successfully
                        isOtpVerified
                        ? {
                            type: "success",
                            message: "OTP verified successfully",
                          }
                        : undefined
        }
      />

      {isOtpSent && !isOtpVerified && (
        <InputWithButton
          id="mobileOtp"
          type="text"
          value={mobileOtp}
          onChange={(e) => setMobileOtp(e.target.value)}
          label="Mobile OTP"
          buttonText="Verify OTP"
          onButtonClick={handleVerifyMobileOtp}
          buttonDisabled={verifyLoading}
          required
          helperText={
            verifyLoading
              ? { type: "loading", message: "Verifying OTP..." }
              : verifyError
                ? { type: "error", message: verifyError }
                : undefined
          }
        />
      )}
    </>
  );
};
export default Mobile;
