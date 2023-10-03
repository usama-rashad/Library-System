import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USERS_API, backEndRoot, backEndPort } from "../contants.js";
import axios from "axios";

const initialState = { success: false, fail: false, pending: false, state: "", message: "", users: [] };

const getUsersByFirstName = createAsyncThunk("getUsersByFirstName", async ({ firstname }, { rejectWithValue, fulfillWithValue }) => {
  let url = `${backEndRoot}:${backEndPort}${USERS_API}/findUsersByFirstName`;
  try {
    let response = await axios.post(url, { firstname: firstname });
    return response.data;
  } catch (error) {
    let { message } = error.response.data;
    return rejectWithValue(message);
  }
});

const updateUsersSlice = createSlice({
  name: "updateUsers",
  initialState: initialState,
  reducers: {
    clearUsers(state, action) {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersByFirstName.pending, (state, action) => {
      state.pending = true;
      state.success = false;
      state.fail = false;
      state.state = "";
      state.message = "";
    }),
      builder.addCase(getUsersByFirstName.fulfilled, (state, action) => {
        let { payload } = action;
        state.pending = false;
        state.success = true;
        state.fail = false;
        state.state = "success";
        state.users = payload.users;
      }),
      builder.addCase(getUsersByFirstName.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.fail = true;
        state.state = "fail";
        state.message = action.payload;
      });
  },
});

export const updateUserReducer = updateUsersSlice.reducer;
export const { clearUsers } = updateUsersSlice.actions;
export { getUsersByFirstName };
