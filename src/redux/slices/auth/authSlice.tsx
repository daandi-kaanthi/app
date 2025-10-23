// authSlice.ts
import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

interface TokenPayload {
  authToken: string;
  refreshToken: string;
}

interface CredentialsPayload {
  user: string;
  token: TokenPayload;
  userType: string;
  isLoading: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  authToken: string | null;
  refreshToken: string | null;
  userType: string | null;
  isLoading: boolean;
}

const storedUser = localStorage.getItem('user');
const storedAuthToken = localStorage.getItem('authToken');
const storedRefreshToken = localStorage.getItem('refreshToken');
const storedUserType = localStorage.getItem('userType');

const initialState: AuthState = {
  isAuthenticated: storedAuthToken ? true : false,
  user: storedUser,
  authToken: storedAuthToken,
  refreshToken: storedRefreshToken,
  userType: storedUserType,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authToken = action.payload.token.authToken;
      state.refreshToken = action.payload.token.refreshToken;
      state.userType = action.payload.userType;
      state.isLoading = action.payload.isLoading;

      localStorage.setItem('user', action.payload.user);
      localStorage.setItem('authToken', action.payload.token.authToken);
      localStorage.setItem('refreshToken', action.payload.token.refreshToken);
      localStorage.setItem('userType', action.payload.userType);
    },
    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.authToken = null;
      state.refreshToken = null;
      state.userType = null;
      state.isLoading = false;

      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userType');
    },
    refreshAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
      localStorage.setItem('authToken', action.payload);
    },
  },
});

export const { setCredentials, setLoading, logout, refreshAuthToken } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.authToken;
export const isAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: AuthState }) => state.auth.userType;
export const authLoading = (state: { auth: AuthState }) => state.auth.isLoading;
