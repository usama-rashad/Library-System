import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loginSignupReducer } from "../reducers/loginSignupReducer";
import { authReducer } from "../reducers/authReducer";

const combinedReducers = combineReducers({ loginSignup: loginSignupReducer, auth: authReducer });
const rootStore = configureStore({
  reducer: combinedReducers,
});

export default rootStore;
