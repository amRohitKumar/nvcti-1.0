import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../features/events/eventsSlice";
import { Carousel, OngoingEventsTable } from "../../../components";
import { ongoingEvents } from "../../../data";
import { useTitle } from "../../../hooks";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const ClientDashboard = () => {
  useTitle("Dashboard");
  const dispatch = useDispatch();
  const { isLoading, events } = useSelector((store) => store.events);

  useEffect(() => {
    dispatch(fetchEvents());
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (events.length === 0) {
    return (
      <Alert
        severity="info"
        sx={{ width: { xs: "90%", md: "60%" }, mx: "auto" }}
      >
        There are currently no live events.
      </Alert>
    );
  }

  return (
    <>
      <Carousel data={ongoingEvents} />
      <OngoingEventsTable events={events} />
    </>
  );
};

export default ClientDashboard;
