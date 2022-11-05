import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeaders";
import { clearEvents } from "../events/eventsSlice";
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
    thunkAPI.dispatch(clearEvents());
    thunkAPI.dispatch(logoutUser());
    return Promise.resolve();
  } catch(error){
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const submitEventThunk = async ({eventId, answer}, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/event/${eventId}/submitForm`, answer, authHeader(thunkAPI));
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
}