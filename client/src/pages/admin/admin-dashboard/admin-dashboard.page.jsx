import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../features/events/eventsSlice";
import { OngoingEventsAdmin } from "../../../components";
import { CircularProgress, Alert } from "@mui/material";
import Wrapper from "./admin-dashboard.style";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, events } = useSelector((store) => store.events);

  useEffect(() => {
    dispatch(fetchEvents());
    //eslint-disable-next-line
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
        There are no events.
      </Alert>
    );
  }
  return (
    <Wrapper>
      <OngoingEventsAdmin events={events} />
    </Wrapper>
  );
};

export default AdminDashboard;
