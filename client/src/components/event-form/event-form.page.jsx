import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../features/events/eventsSlice";

import { CircularProgress, Box } from "@mui/material";
import { EventApplicationForm } from "..";
import Wrapper from "./event-form.style";

const EventFormPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  console.log(eventId);
  const { isLoading, events } = useSelector((store) => store.events);
  useEffect(() => {
    dispatch(fetchEvents());
    //eslint-disable-next-line
  }, []);

  if (isLoading || !events) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress sx={{ mx: "auto", mt: 3 }} />;
      </Box>
    );
  }
  
  return (
    <Wrapper>
      <EventApplicationForm
        eventFormData={events.filter((event) => event._id === eventId)[0]}
      />
    </Wrapper>
  );
};

export default EventFormPage;
