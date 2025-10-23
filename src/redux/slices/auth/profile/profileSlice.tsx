// profileSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile } from './profileApiSlice';

// Define the initial state
const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

// Create the slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export the reducer
export default profileSlice.reducer;

// Selectors
export const selectProfile = (state: { profile: { profile: any; }; }) => state.profile.profile;
export const selectProfileLoading = (state: { profile: { isLoading: any; }; }) => state.profile.isLoading;
export const selectProfileError = (state: { profile: { error: any; }; }) => state.profile.error;