import { createSlice } from "@reduxjs/toolkit";

const initialValue = { userEmailList: [], isEmpty: true };

const UserEmailListSlice = createSlice({
  name: "UserEmailList",
  initialState: initialValue,
  reducers: {
    addToList(state, action) {
      let email = action.payload;
      let currentList = state.userEmailList;
      currentList.push(email);
      if (state.userEmailList.length > 0) {
        state.isEmpty = false;
      }
    },
    removeFromList(state, action) {
      let email = action.payload;
      // Remove from list
      let currentList = state.userEmailList;
      let index = currentList.findIndex((value) => value === email);
      if (index >= 0) currentList.splice(index, 1);
      if (state.userEmailList.length === 0) {
        state.isEmpty = true;
      }
    },
    clearList(state, action) {
      state.userEmailList = [];
      state.isEmpty = true;
    },
  },
});

export const UserEmailListReducer = UserEmailListSlice.reducer;
export const { addToList, removeFromList, clearList } = UserEmailListSlice.actions;
