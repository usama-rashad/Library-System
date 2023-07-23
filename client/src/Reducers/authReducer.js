import { createSlice } from "@reduxjs/toolkit";

const initialState = { state: 0 };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.state = 1;
    },
    signup(state, action) {
      state.state = 2;
    },
    close(state, action) {
      state.state = 0;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, signup, close } = authSlice.actions;
