import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../Backend/apiCall";


// Define the async thunk for fetching the profile
export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (_, { rejectWithValue }) => {
      try {
        const response = await Request({
          endpointId: "PROFILE",
          slug: null,
          data: {},
          params: {},
        });
        return response.data.seller;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );