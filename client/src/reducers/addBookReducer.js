import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BOOKS_API, backEndRoot, backEndPort } from "./../contants.js";
import axios from "axios";

const initialState = { success: false, fail: false, pending: false, message: "", state: "" };

const addBookAsyncThunk = createAsyncThunk(
  "addNewBook",
  async ({ username, bookData }, { rejectWithValue, fulfillWithValue }) => {
    let url = `${backEndRoot}:${backEndPort}${BOOKS_API}/testBook`; // , { username: username, ...bookData }

    try {
      let response = await axios.get(url);
      console.log("Response success.");
      return response.data;
    } catch (error) {
      console.log("Rejected with value.");
      return rejectWithValue(error);
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
      state.message = "Wait...";
      state.state = "";
    }),
      builder.addCase(addBookAsyncThunk.fulfilled, (state, action) => {
        state.pending = false;
        state.success = true;
        state.fail = false;
        state.message = "Successfully added a new book. System response : " + JSON.stringify(action.payload);
        state.state = "success";
      }),
      builder.addCase(addBookAsyncThunk.rejected, (state, payload) => {
        state.pending = false;
        state.success = false;
        state.fail = true;
        state.message = "Failed to add a new book. System error : " + JSON.stringify(payload);
        state.state = "fail";
      });
  },
});

export const addBookReducer = addBookSlice.reducer;
export const { reset, clearMessage } = addBookSlice.actions;
export { addBookAsyncThunk };
