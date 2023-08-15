import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { success: false, fail: false, pending: false, message: "", state: "" };

export const addBookRequest = createAsyncThunk("books/addNew", async (bookData) => {
  const response = await axios.put(`${backEndRoot}:${backEndPort}${BOOKS_API}/testBook`, {
    // title,
    // author,
    // ISBN,
    // details,
    // quantity,
    // details,
    output: bookData,
  });
  console.log(response.data);
  return response.data;
});

const addBookSlice = createSlice({
  name: "addNewBook",
  initialState: initialState,
  reducers: {
    reset(state, action) {
      state.pending = false;
      state.success = false;
      state.fail = false;
      state.message = "";
      state.state = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBookRequest.pending, (state, action) => {
      state.pending = true;
      state.success = false;
      state.fail = false;
      state.message = "Wait...";
      state.state = "";
    }),
      builder.addCase(addBookRequest.fulfilled, (state, action) => {
        state.pending = false;
        state.success = true;
        state.fail = false;
        state.message = "Successfully added a new book.";
        state.state = "success";
      }),
      builder.addCase(addBookRequest.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.fail = true;
        state.message = "Failed to add a new book.";
        state.state = "fail";
      });
  },
});

export const addBookReducer = addBookSlice.reducer;
export const { reset } = addBookSlice.actions;
