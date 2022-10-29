import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { fetchEventsThunk } from "./eventsThunk";

const initialState = {
  isLoading: false,
  events: [],
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  fetchEventsThunk
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchEvents.fulfilled]: (state, { allEvents }) => {
      state.isLoading = false;
      state.events = allEvents;
    },
    [fetchEvents.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Something went wrong while fetching the events");
    },
  },
});

export default eventsSlice.reducer;
