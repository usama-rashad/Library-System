import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BOOKS_API, backEndRoot, backEndPort } from "./../contants.js";
import axios from "axios";

const initialState = { success: false, fail: false, pending: false, message: "", genres: [] };

const getGenresThunk = createAsyncThunk("getGenres", async (__values, { rejectWithValue, fulfillWithValue }) => {
  let url = `${backEndRoot}:${backEndPort}${BOOKS_API}/fetchGenres`;
  try {
    let response = await axios.get(url);
    return response.data.genres;
  } catch (error) {
    let { message } = error.response.data;
    return rejectWithValue(message);
  }
});

const getGenresSlice = createSlice({
  name: "getGenres",
  initialState: initialState,

  extraReducers: (builder) => {
    builder.addCase(getGenresThunk.pending, (state, action) => {
      state.pending = true;
      state.success = false;
      state.fail = false;
      state.message = "Waiting...";
      state.state = "";
      console.log("Pending...");
    }),
      builder.addCase(getGenresThunk.fulfilled, (state, action) => {
        let { payload } = action;
        state.pending = false;
        state.success = true;
        state.fail = false;
        state.message = payload.message;
        state.genres = [...payload];
        console.log("fulfilled...");
      }),
      builder.addCase(getGenresThunk.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.fail = true;
        state.message = action.payload;
        state.genres = [];
        console.log("rejected...");
      });
  },
});

export const getGenresReducer = getGenresSlice.reducer;
export { getGenresThunk };
