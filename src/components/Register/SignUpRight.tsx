import { useState, type FormEvent } from "react";
import Mobile from "./Mobile";
import { useDispatch, useSelector } from "react-redux";
import { selectOtpTypeState } from "../../redux/slices/otpService/otpSlice";
import { RegisterAsSeller } from "../../redux/slices/auth/authActions";
import { type AppDispatch } from "../../redux/store";
import GSTINInput from "./GSTIN";
import FileUpload from "./FileUpload";
import { ConenctWalletButton } from "../ui/Button/ThirdwebLoginButton";

const SignUpRight: React.FC = () => {
  const [validationMessage, setValidationMessage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const otpState = useSelector(selectOtpTypeState("auth"));
  const { isOtpVerified: isOtpVerifiedMobile } = otpState;

  const [countryCode] = useState<string>("+91");
  const [mobile, setMobile] = useState<string>("");
  const [mobileOtp, setMobileOtp] = useState<string>("");
  const [mobileOtpCountdown, setMobileOtpCountdown] = useState<number>(0);
  const [mobileCountdownActive, setMobileCountdownActive] =
    useState<boolean>(false);

  // GSTIN state
  const [gstin, setGstin] = useState<string>("");
  const [gstinError, setGstinError] = useState<string | null>(null);

  // File uploads
  const [gstinFile, setGstinFile] = useState<File | null>(null);
  const [officePhotoFile, setOfficePhotoFile] = useState<File | null>(null);

  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onFormSuccess = () => {
    setFormState("success");
    setMobile("");
    setMobileOtp("");
    setGstin("");
    setGstinFile(null);
    setOfficePhotoFile(null);
    // Redirect after login/signup success
    // navigate("/seller-dashboard"); // optional
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationMessage("");

    if (!isOtpVerifiedMobile) {
      setValidationMessage("Please verify your mobile OTP");
      return;
    }

    if (!gstin || gstinError) {
      setValidationMessage("Please enter a valid GSTIN");
      return;
    }

    if (!gstinFile) {
      setValidationMessage("Please upload your GSTIN certificate");
      return;
    }

    if (!officePhotoFile) {
      setValidationMessage("Please upload an office photo");
      return;
    }

    setFormState("loading");

    try {
      dispatch(
        RegisterAsSeller({
          phone: mobile,
          countryCode,
          gstin,
          gstinFile,
          officePhotoFile,
          onFormSuccess,
        })
      );
    } catch (error: any) {
      setFormState("error");
      setValidationMessage(
        error?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="w-full p-4 md:w-1/2 transition-transform duration-500">
      <div className="w-full text-center py-8">
        <h1 className="text-[#194F9F] text-xl font-bold mb-3">
          Onboard with us as a Travel Agent
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Mobile
          mobile={mobile}
          setMobile={setMobile}
          mobileOtp={mobileOtp}
          setMobileOtp={setMobileOtp}
          mobileOtpCountdown={mobileOtpCountdown}
          mobileCountdownActive={mobileCountdownActive}
          setMobileCountdownActive={setMobileCountdownActive}
          setMobileOtpCountdown={setMobileOtpCountdown}
        />

        <GSTINInput
          gstin={gstin}
          setGstin={setGstin}
          gstinError={gstinError}
          setGstinError={setGstinError}
        />

 <FileUpload
  label="Upload GSTIN Certificate"
  file={gstinFile}
  setFile={setGstinFile}
  accept=".pdf,.jpg,.jpeg,.png"
  helperText={gstinFile ? { type: "success", message: "File ready" } : undefined}
/>

<FileUpload
  label="Upload Office Photo"
  file={officePhotoFile}
  setFile={setOfficePhotoFile}
  accept=".jpg,.jpeg,.png"
/>

<div className="flex justify-center">

     <ConenctWalletButton/>
</div>

        {validationMessage && (
          <div className="text-red-500 text-[12px] mt-2">{validationMessage}</div>
        )}
        {formState === "success" && (
          <div className="text-green-500 text-[12px] mt-2">
            Form submitted successfully!
          </div>
        )}

        <div className="relative w-full flex py-3 items-center justify-center">
          <span className="absolute inset-x-0 h-px bg-gray-300" />
        </div>
      </form>
    </div>
  );
};

export default SignUpRight;
