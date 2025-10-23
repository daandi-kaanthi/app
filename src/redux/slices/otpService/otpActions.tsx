// import { createAsyncThunk } from "@reduxjs/toolkit";
// import Request from "../../../Backend/apiCall";

// interface PhoneOtpArgs {
//   phone: string;
//   countryCode: string;
// }

// interface VerifyPhoneArgs {
//   phone: string;
//   countryCode: string;
//   otp: string;
// }

// export const sendMobileOtp = createAsyncThunk(
//   "otp/sendMobileOtp",
//   async ({ countryCode, phone }: PhoneOtpArgs, { rejectWithValue }) => {
//     try {
//       const response = await Request({
//         endpointId: "sendMobileOtp",
//         slug: null,
//         data: { countryCode, phone },
//         params: {},
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const verifyPhoneOtp = createAsyncThunk(
//   "otp/verifyPhoneOtp",
//   async ({ phone, countryCode, otp }: VerifyPhoneArgs, { rejectWithValue }) => {
//     try {
//       const response = await Request({
//         endpointId: "verifyPhoneOtp",
//         slug: null,
//         data: { phone, countryCode, otp },
//         params: {},
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateOtpState } from "./otpSlice"; // import the single reducer

export interface PhoneOtpArgs {
  phone: string;
  countryCode: string;
  type?: string; // e.g. login, signup
}

export interface VerifyPhoneArgs {
  phone: string;
  countryCode: string;
  otp: string;
  type?: string;
  trxId:string
}



// Mock delay
const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMobileOtp = createAsyncThunk(
  "otp/sendMobileOtp",
  async ({ countryCode, phone, type }: PhoneOtpArgs, { dispatch, rejectWithValue }) => {
    const otpType = type || "default";
    try {
      // Set loading state
      dispatch(updateOtpState({ type: otpType, updates: { sendLoading: true, sendError: null } }));

      await mockDelay(500); // mock API call
      console.log(`Mock send OTP [${otpType}] to:`, countryCode + phone);
      const trxId="getFrom=Backend"
      // Set success state
      dispatch(updateOtpState({ type: otpType, updates: { sendLoading: false, isOtpSent: true,trxId:trxId } }));
      return { success: true };
    } catch (error) {
      // Set error state
      dispatch(updateOtpState({ type: otpType, updates: { sendLoading: false, sendError: "Failed to send OTP" } }));
      return rejectWithValue("Failed to send OTP");
    }
  }
);

export const verifyPhoneOtp = createAsyncThunk(
  "otp/verifyPhoneOtp",
  async ({ otp, type,trxId }: VerifyPhoneArgs, { dispatch, rejectWithValue }) => {
    const otpType = type || "default";
    try {
      // Set verify loading
      dispatch(updateOtpState({ type: otpType, updates: { verifyLoading: true, verifyError: null } }));

      await mockDelay(500); // mock API call
      console.log(`Mock verify OTP [${otpType}]:`, otp, "for", trxId);

      if (otp === "123456") {
        // Success
        dispatch(updateOtpState({ type: otpType, updates: { verifyLoading: false, isOtpVerified: true } }));
        return { success: true };
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      // Error
      dispatch(updateOtpState({ type: otpType, updates: { verifyLoading: false, verifyError: "Invalid OTP" } }));
      return rejectWithValue("Invalid OTP");
    }
  }
);
