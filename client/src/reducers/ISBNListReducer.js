import { createSlice } from "@reduxjs/toolkit";

const initialValue = { ISBNList: [], isEmpty: true };

const ISBNListSlice = createSlice({
  name: "ISBNList",
  initialState: initialValue,
  reducers: {
    addToList(state, action) {
      let ISBN = action.payload;
      let currentList = state.ISBNList;
      currentList.push(ISBN);
      if (state.ISBNList.length > 0) {
        state.isEmpty = false;
      }
    },
    removeFromList(state, action) {
      let ISBN = action.payload;
      // Remove from list
      let currentList = state.ISBNList;
      let index = currentList.findIndex((value) => value === ISBN);
      if (index >= 0) currentList.splice(index, 1);
      if (state.ISBNList.length === 0) {
        state.isEmpty = true;
      }
    },
    clearList(state, action) {
      state.ISBNList = [];
      state.isEmpty = true;
    },
  },
});

export const ISBNListReducer = ISBNListSlice.reducer;
export const { addToList, removeFromList, clearList } = ISBNListSlice.actions;
