import { useEffect, useState } from "react";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/userAuthHeaders";
import { PreviousApplications, CircularLoader } from "../../../components";
import { useTitle } from "../../../hooks";

import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const ClientDashboard = () => {
  useTitle("Dashboard");
  const {_id: currentUserId, token} = useSelector(store => store?.user?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const resp = await customFetch.get(`/form/getforms/${currentUserId}`, authHeader(token));
      console.log(resp);
      setEvents(resp.data.formSubmitted);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

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
      <PreviousApplications enrolledevents={events} />
    </>
  );
};

export default ClientDashboard;
