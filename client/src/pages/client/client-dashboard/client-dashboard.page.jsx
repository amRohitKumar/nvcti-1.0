import { useEffect, useState } from "react";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/userAuthHeaders";
import { PreviousApplications, CircularLoader, Carousel, OngoingEventsTable } from "../../../components";
import { useTitle } from "../../../hooks";

import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";

// display ongoing events
export const ongoingEvents = [
  {
    id: 1,
    title: "Title one",
    imageUrl:
      "https://images.unsplash.com/photo-1663340154077-dbfdd04ea6e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    id: 2,
    title: "Title two",
    imageUrl:
      "https://images.unsplash.com/photo-1663357248545-d952b17dbd43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
  {
    id: 3,
    title: "Title three",
    imageUrl:
      "https://images.unsplash.com/photo-1663350928554-f90590dd76de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
  },
];
const ClientDashboard = () => {
  useTitle("Dashboard");
  const {_id: currentUserId} = useSelector(store => store?.user?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  // useEffect(() => {
  //   // const fetchEvents = async () => {
  //   //   setIsLoading(true);
  //   //   const resp = await customFetch.get(`/form/getforms/${currentUserId}`,);
  //   //   console.log(resp);
  //   //   setEvents(resp.data.formSubmitted);
  //   //   setIsLoading(false);
  //   // };
  //   // fetchEvents();
  // }, []);

  if (isLoading) {
    return <CircularLoader />
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
      {/* <Carousel data={ongoingEvents} /> */}
      <OngoingEventsTable enrolledevents={events} />
    </>
  );
};

export default ClientDashboard;
