import { useEffect, useState } from "react";
import customFetch from "../../../utils/axios";
import { Carousel, PreviousStatusTable } from "../../../components";
import { ongoingEvents } from "../../../data";
import { useTitle } from "../../../hooks";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const ClientDashboard = () => {
  useTitle("Dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const resp = await customFetch.get("/event/allevents");
      setEvents(resp.data);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  if (isLoading) {
    return <CircularProgress sx={{ mx: "auto" }} />;
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
      <PreviousStatusTable enrolledevents={events} />
    </>
  );
};

export default ClientDashboard;
