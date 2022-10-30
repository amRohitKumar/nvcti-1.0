import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { fetchEventsThunk, addEventThunk } from "./eventsThunk";

const initialState = {
  isLoading: false,
  events: [],
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  fetchEventsThunk
);

export const addEvent = createAsyncThunk("events/addEvent", addEventThunk);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchEvents.fulfilled]: (state, { payload }) => {
      const { allEvents } = payload;
      state.isLoading = false;
      state.events = allEvents;
    },
    [fetchEvents.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Something went wrong while fetching the events");
    },
    [addEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [addEvent.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Event added successfully !");
    },
    [addEvent.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Something went wrong while adding event");
    },
  },
});

export default eventsSlice.reducer;
