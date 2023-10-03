import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USERS_API, backEndRoot, backEndPort } from "../contants.js";
import axios from "axios";

const initialState = { success: false, fail: false, pending: false, message: "", state: "" };

const deleteUsersAsyncThunk = createAsyncThunk(
  "deleteUsers",
  async ({ username, userEmailList }, { rejectWithValue, fulfillWithValue }) => {
    let url = `${backEndRoot}:${backEndPort}${USERS_API}/deleteUsersByEmail`;
    let promisesList = [];
    for (let index = 0; index < ISBNList[index]; index++) {
      promisesList.push(axios.put(url, { username: username, email: userEmailList[index] }));
    }

    console.log(`List of promises ${promisesList}`);
    return Promise.all(promisesList)
      .then((value) => {
        fulfillWithValue(`Users with Emails ${[...userEmailList]}`);
      })
      .catch((error) => {
        console.log(`Promise all NOK ${JSON.stringify(error)}`);
        rejectWithValue(error);
      });
  }
);

const deleteUsersSlice = createSlice({
  name: "deleteUsers",
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
    builder.addCase(deleteUsersSlice.pending, (state, action) => {
      state.pending = true;
      state.success = false;
      state.fail = false;
      state.message = "Waiting...";
      state.state = "";
    }),
      builder.addCase(deleteUsersSlice.fulfilled, (state, action) => {
        let { payload } = action;
        state.pending = false;
        state.success = true;
        state.fail = false;
        // state.message = payload.message;
        console.log(action);
        state.state = "success";
      }),
      builder.addCase(deleteUsersSlice.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.fail = true;
        // state.message = action.payload;
        state.message = "Rejected";

        state.state = "fail";
      });
  },
});

export const deleteBooksReducer = deleteUsersSlice.reducer;
export const { clearMessage } = deleteUsersSlice.actions;
export { deleteUsersAsyncThunk };
