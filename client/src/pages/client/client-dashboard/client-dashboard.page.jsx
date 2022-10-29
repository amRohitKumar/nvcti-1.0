import { useEffect } from "react";
import { Carousel, OngoingEventsTable } from "../../../components";
import { ongoingEvents } from "../../../data";
import { useTitle } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../features/events/eventsSlice";

import CircularProgress from "@mui/material/CircularProgress";

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
  return (
    <>
      <Carousel data={ongoingEvents} />
      <OngoingEventsTable events={events} />
    </>
  );
};

export default ClientDashboard;
