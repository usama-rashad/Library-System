import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loginSignupReducer } from "../reducers/loginSignupReducer";
import { authReducer } from "../reducers/authReducer";
import { dashboardSelectionReducer } from "../reducers/dashboardSelectionReducer";

const combinedReducers = combineReducers({
  loginSignup: loginSignupReducer,
  auth: authReducer,
  dashboard: dashboardSelectionReducer,
});
const rootStore = configureStore({
  reducer: combinedReducers,
});

export default rootStore;
