import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: "", userid: "", isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loggedIn(state, action) {
      state.username = action.payload.username;
      state.userid = action.payload.userid;
      state.isLoggedIn = true;
      console.log("Logged in.");
    },
    loggedOut(state, action) {
      state.username = "";
      state.userid = "";
      state.isLoggedIn = false;
      console.log("Logged out.");
    },
  },
});

export const authReducer = authSlice.reducer;
export const { loggedIn, loggedOut } = authSlice.actions;
