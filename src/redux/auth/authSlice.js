import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      user: payload,
      error: null,
    }),
    authSignOut: () => initialState,
    setErrorMessage: (state, { payload }) => ({
      error: payload.error,
    }),
  },
});
