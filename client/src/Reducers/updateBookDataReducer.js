import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BOOKS_API, backEndRoot, backEndPort } from "../contants.js";
import axios from "axios";

const initialState = { success: false, fail: false, pending: false, state: "", message: "" };

const updateBookDataThunk = createAsyncThunk(
  "updateBookData",
  async ({ username, ISBN, modifiedBookData }, { rejectWithValue, fulfillWithValue }) => {
    let url = `${backEndRoot}:${backEndPort}${BOOKS_API}/updateBookInfo`;
    try {
      let response = await axios.post(url, { username: username, ISBN: ISBN, modifiedBookData: modifiedBookData });
      return response.data;
    } catch (error) {
      let { message } = error.response.data;
      return rejectWithValue(message);
    }
  }
);

const updateBookDataSlice = createSlice({
  name: "updateBookData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBookDataThunk.pending, (state, action) => {
      state.pending = true;
      state.success = false;
      state.fail = false;
      state.state = "";
      state.message = "";
    }),
      builder.addCase(updateBookDataThunk.fulfilled, (state, action) => {
        let { payload } = action;
        state.pending = false;
        state.success = true;
        state.fail = false;
        state.state = "success";
        state.books = payload.books;
      }),
      builder.addCase(updateBookDataThunk.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.fail = true;
        state.state = "fail";
        state.message = action.payload;
      });
  },
});

export const updateBookDataReducer = updateBookDataSlice.reducer;
export const {} = updateBookDataSlice.actions;
export { updateBookDataThunk };
