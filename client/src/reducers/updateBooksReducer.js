import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BOOKS_API, backEndRoot, backEndPort } from "./../contants.js";
import axios from "axios";

const initialState = { success: false, fail: false, pending: false, state: "", message: "", books: [] };

const getBooksByISBNThunk = createAsyncThunk("getBooksByISBN", async ({ ISBN }, { rejectWithValue, fulfillWithValue }) => {
  let url = `${backEndRoot}:${backEndPort}${BOOKS_API}/findByISBN`;
  try {
    let response = await axios.post(url, { ISBN: ISBN });
    return response.data;
  } catch (error) {
    let { message } = error.response.data;
    return rejectWithValue(message);
  }
});

const updateBooksSlice = createSlice({
  name: "updateBooks",
  initialState: initialState,
  reducers: {
    clearBooks(state, action) {
      state.books = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooksByISBNThunk.pending, (state, action) => {
      state.pending = true;
      state.success = false;
      state.fail = false;
      state.state = "";
      state.message = "";
    }),
      builder.addCase(getBooksByISBNThunk.fulfilled, (state, action) => {
        let { payload } = action;
        state.pending = false;
        state.success = true;
        state.fail = false;
        state.state = "success";
        state.books = payload.books;
      }),
      builder.addCase(getBooksByISBNThunk.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.fail = true;
        state.state = "fail";
        state.message = action.payload;
      });
  },
});

export const updateBookReducer = updateBooksSlice.reducer;
export const { clearBooks } = updateBooksSlice.actions;
export { getBooksByISBNThunk };
