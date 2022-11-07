import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customFetch from "../../utils/axios";

import { CircularProgress, Box } from "@mui/material";
import { EventApplicationForm } from "..";
import Wrapper from "./event-form.style";

const EventFormPage = () => {
  const { eventId } = useParams();
  console.log(eventId);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(false);
  useEffect( () => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const resp = await customFetch.get("/event/allevents");
      setEvents(resp.data);
      setIsLoading(false);
    }
    fetchEvents();
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
