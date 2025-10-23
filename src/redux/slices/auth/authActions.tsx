// authActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCredentials, setLoading } from './authSlice';
import Request from '../../../Backend/apiCall';


interface SellerRegisterArgs {
  countryCode: string;
  phone: string;
  gstin:string
  onFormSuccess?: () => void;
}

export const RegisterAsSeller = createAsyncThunk(
  'auth/signUp',
  async ({ countryCode, phone,gstin, onFormSuccess }: SellerRegisterArgs, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading({ isLoading: true }));

      const response = await Request({
        endpointId: "SELLER_SIGNUP",
        data: { countryCode, phone },
      });

      const { authToken, refreshToken } = response.data;

      dispatch(setCredentials({
        user: phone,
        token: { authToken, refreshToken },
        userType:response.data.userType,
        isLoading: false
      }));

      if (onFormSuccess) onFormSuccess();
      return response.data;
    } catch (error) {
      dispatch(setLoading({ isLoading: false }));
      return rejectWithValue(error);
    }
  }
);
