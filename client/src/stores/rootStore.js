import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loginSignupReducer } from "../reducers/loginSignupReducer";
import { authReducer } from "../reducers/authReducer";
import { dashboardSelectionReducer } from "../reducers/dashboardSelectionReducer";
import { addBookReducer } from "./../reducers/addBookReducer";
import { updateBookReducer } from "./../reducers/updateBooksReducer";

const combinedReducers = combineReducers({
  loginSignup: loginSignupReducer,
  auth: authReducer,
  dashboard: dashboardSelectionReducer,
  addBooks: addBookReducer,
  updateBooks: updateBookReducer,
});
const rootStore = configureStore({
  reducer: combinedReducers,
});

export default rootStore;
