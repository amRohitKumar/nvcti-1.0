import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeaders";

export const fetchEventsThunk = async (_, thunkAPI) => {
    try {
        const resp = await customFetch.get("/event/allevents");
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};
export const addEventThunk = async (eventObj, thunkAPI) => {
    try{
        console.log("thunk = ", eventObj);
        const resp = await customFetch.post("/event/submit", eventObj, authHeader(thunkAPI));
        return resp.data;
    } catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}