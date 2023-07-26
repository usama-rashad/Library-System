import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authReducer";

const AuthStore = configureStore({
  reducer: authReducer,
});

export default AuthStore;
