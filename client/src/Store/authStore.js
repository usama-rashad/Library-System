import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../Reducers/authReducer";

const AuthStore = configureStore({
  reducer: authReducer,
});

export default AuthStore;
