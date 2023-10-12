import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loginSignupReducer } from "../reducers/loginSignupReducer";
import { authReducer } from "../reducers/authReducer";
import { dashboardSelectionReducer } from "../reducers/dashboardSelectionReducer";
import { addBookReducer } from "./../reducers/addBookReducer";
import { updateBookReducer } from "./../reducers/updateBooksReducer";
import { getGenresReducer } from "./../reducers/getGenreReducer";
import { ISBNListReducer } from "./../reducers/ISBNListReducer";
import { UserEmailListReducer } from "./../reducers/UserEmailListReducer";
import { deleteBooksReducer } from "./../reducers/deleteBooksReducer";
import { updateUserReducer } from "../reducers/updateUsersReducer";
import { updateBookDataReducer } from "../Reducers/updateBookDataReducer";

const combinedReducers = combineReducers({
  loginSignup: loginSignupReducer,
  auth: authReducer,
  dashboard: dashboardSelectionReducer,
  addBooks: addBookReducer,
  updateBooks: updateBookReducer,
  updateBookData: updateBookDataReducer,
  updateUsers: updateUserReducer,
  getGenres: getGenresReducer,
  ISBNList: ISBNListReducer,
  userEmailList: UserEmailListReducer,
  deleteBooks: deleteBooksReducer,
});
const rootStore = configureStore({
  reducer: combinedReducers,
});

export default rootStore;
