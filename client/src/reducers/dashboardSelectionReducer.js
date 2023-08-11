import { createSlice } from "@reduxjs/toolkit";

const dashboardStates = {
  ADD_NEW_BOOK: 1,
  UPDATE_BOOK: 2,
  REMOVE_BOOK: 3,
  ADD_NEW_USER: 4,
  UPDATE_USER: 5,
  REMOVE_USER: 6,
};

const dashboardSelectionState = { dashboardType: 0 };

const dashboardSelectionSlice = createSlice({
  name: "dashboardSelection",
  initialState: dashboardSelectionState,
  reducers: {
    // Book action dashboards
    changeToAddNewBook(state, action) {
      state.dashboardType = dashboardStates.ADD_NEW_BOOK;
    },
    changeToRemoveBook(state, action) {
      state.dashboardType = dashboardStates.REMOVE_BOOK;
    },
    changeToUpdateBook(state, action) {
      state.dashboardType = dashboardStates.UPDATE_BOOK;
    },
    // User action dashboards
    changeToAddNewUsers(state, action) {
      state.dashboardType = dashboardStates.ADD_NEW_USER;
    },
    changeToRemoveUsers(state, action) {
      state.dashboardType = dashboardStates.REMOVE_USER;
    },
    changeToUpdateUsers(state, action) {
      state.dashboardType = dashboardStates.UPDATE_USER;
    },
  },
});

export const dashboardSelectionReducer = dashboardSelectionSlice.reducer;
export const {
  changeToAddNewBook,
  changeToAddNewUsers,
  changeToRemoveBook,
  changeToRemoveUsers,
  changeToUpdateBook,
  changeToUpdateUsers,
} = dashboardSelectionSlice.actions;
