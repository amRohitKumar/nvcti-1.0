import customFetch from "../../utils/axios";

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
        const resp = await customFetch.post("/event/addevent", eventObj);
        return resp.data;
    } catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}