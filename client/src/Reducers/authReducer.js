import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: "", isLoggedIn: false, isAdmin: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loggedIn(state, action) {
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
      state.isLoggedIn = true;
      console.log("Logged in.");
    },
    loggedOut(state, action) {
      state.username = "";
      state.isAdmin = "";
      state.isLoggedIn = false;
      console.log("Logged out.");
    },
  },
});

export const authReducer = authSlice.reducer;
export const { loggedIn, loggedOut } = authSlice.actions;
