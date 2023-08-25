import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BOOKS_API, backEndRoot, backEndPort } from "./../contants.js";
import axios from "axios";

const initialState = { success: false, fail: false, pending: false, message: "", state: "" };

const addBookAsyncThunk = createAsyncThunk(
  "addNewBook",
  async ({ username, bookData, storageInfo }, { rejectWithValue, fulfillWithValue }) => {
    let url = `${backEndRoot}:${backEndPort}${BOOKS_API}/addNew`;
    try {
      let response = await axios.put(url, { username: username, ...bookData, storageInfo: storageInfo });
      return response.data;
    } catch (error) {
      let { message } = error.response.data;
      return rejectWithValue(message);
    }
  }
);

const addBookSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    reset(state, action) {
      state.pending = false;
      state.success = false;
      state.fail = false;
      state.message = "";
      state.state = "";
    },
    clearMessage(state, action) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBookAsyncThunk.pending, (state, action) => {
      state.pending = true;
      state.success = false;
      state.fail = false;
      state.message = "Waiting...";
      state.state = "";
    }),
      builder.addCase(addBookAsyncThunk.fulfilled, (state, action) => {
        let { payload } = action;
        state.pending = false;
        state.success = true;
        state.fail = false;
        state.message = payload.message;
        state.state = "success";
      }),
      builder.addCase(addBookAsyncThunk.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.fail = true;
        state.message = action.payload;
        state.state = "fail";
      });
  },
});

export const addBookReducer = addBookSlice.reducer;
export const { reset, clearMessage, addStorageInfo, removeStorageInfo } = addBookSlice.actions;
export { addBookAsyncThunk };
