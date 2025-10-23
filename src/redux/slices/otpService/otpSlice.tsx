import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface OtpTypeState {
  isOtpVerified: boolean;
  isOtpSent: boolean;
  sendLoading: boolean;
  verifyLoading: boolean;
  sendError: string | null;
  verifyError: string | null;
  trxId:string;
}

export interface RootOtpState {
  [type: string]: OtpTypeState;
}

const initialOtpTypeState: OtpTypeState = {
  isOtpVerified: false,
  isOtpSent: false,
  sendLoading: false,
  verifyLoading: false,
  sendError: null,
  verifyError: null,
  trxId:"",
};

const initialState: RootOtpState = {};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    resetOtpType: (state, action: PayloadAction<string>) => {
      state[action.payload] = { ...initialOtpTypeState };
    },
    updateOtpState: (
      state,
      action: PayloadAction<{ type: string; updates: Partial<OtpTypeState> }>
    ) => {
      const { type, updates } = action.payload;
      state[type] = { ...(state[type] || initialOtpTypeState), ...updates };
    },
  },
});

export const { resetOtpType, updateOtpState } = otpSlice.actions;
export default otpSlice.reducer;

// Selector
export const selectOtpTypeState = (type: string) => (state: { otp: RootOtpState }) =>
  state.otp[type] || { ...initialOtpTypeState };
