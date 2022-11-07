import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  registerUserThunk,
  loginUserThunk,
  verifyUserThunk,
  logoutUserThunk,
  submitEventThunk,
} from "./userThunk";

import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localstorage";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  registerUserThunk
);
export const verifyUser = createAsyncThunk("user/verifyUser", verifyUserThunk);
export const loginUser = createAsyncThunk("user/loginUser", loginUserThunk);
export const clearUser = createAsyncThunk("user/logoutUser", logoutUserThunk);
export const submitEvent = createAsyncThunk("user/submitEvent", submitEventThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      toast.success("Logout Successfully");
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { msg } = payload;
      state.isLoading = false;
      toast.success(msg);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [verifyUser.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      console.log(user);
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello there ${user.name}`);
    },
    [verifyUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome back, ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [clearUser.rejected]: (_, { payload }) => {
      toast.error(payload);
    },
    [submitEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [submitEvent.fulfilled]: (state, { payload }) => {
      const {user} = payload;
      console.log(payload);
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success("Applyed successfully !");
    },
    [submitEvent.rejected]: (state, { payload }) => {
      const {msg} = payload;
      state.isLoading = false;
      toast.error(msg);
    },
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
