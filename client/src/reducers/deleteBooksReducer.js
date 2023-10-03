import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BOOKS_API, backEndRoot, backEndPort } from "../contants.js";
import axios from "axios";

const initialState = { success: false, fail: false, pending: false, message: "", state: "" };

const deleteBooksAsyncThunk = createAsyncThunk("deleteBooks", async ({ username, ISBNList }, { rejectWithValue, fulfillWithValue }) => {
  let url = `${backEndRoot}:${backEndPort}${BOOKS_API}/deleteByISBN`;
  let promisesList = [];
  for (let index = 0; index < ISBNList[index]; index++) {
    promisesList.push(axios.put(url, { username: username, ISBN: ISBNList[index] }));
  }

  console.log(`List of promises ${promisesList}`);
  return Promise.all(promisesList)
    .then((value) => {
      fulfillWithValue(`Books with ISBNs ${[...ISBNList]}`);
    })
    .catch((error) => {
      console.log(`Promise all NOK ${JSON.stringify(error)}`);
      rejectWithValue(error);
    });
});

const deleteBooksSlice = createSlice({
  name: "deleteBooks",
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
    builder.addCase(deleteBooksAsyncThunk.pending, (state, action) => {
      state.pending = true;
      state.success = false;
      state.fail = false;
      state.message = "Waiting...";
      state.state = "";
    }),
      builder.addCase(deleteBooksAsyncThunk.fulfilled, (state, action) => {
        let { payload } = action;
        state.pending = false;
        state.success = true;
        state.fail = false;
        // state.message = payload.message;
        console.log(action);
        state.state = "success";
      }),
      builder.addCase(deleteBooksAsyncThunk.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.fail = true;
        // state.message = action.payload;
        state.message = "Rejected";
        state.state = "fail";
      });
  },
});

export const deleteBooksReducer = deleteBooksSlice.reducer;
export const { clearMessage } = deleteBooksSlice.actions;
export { deleteBooksAsyncThunk };
