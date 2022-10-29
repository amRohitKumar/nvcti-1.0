import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/register", user);
    return resp.data;
  } catch (error) {
    console.log(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const verifyUserThunk = async (token, thunkAPI) => {
  try{
    const resp = await customFetch.get(`/auth/verify-email/${token}`);
    return resp.data;
  } catch(error){
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}
export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/auth/login", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const logoutUserThunk = async (_, thunkAPI) => {
  try{
    console.log("/auth/logout");
    await customFetch.get("/auth/logout");
    thunkAPI.dispatch(logoutUser());
    return Promise.resolve();
  } catch(error){
    return thunkAPI.rejectWithValue(error.message);
  }
};
