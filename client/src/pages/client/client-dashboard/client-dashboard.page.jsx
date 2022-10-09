import { useLayoutEffect } from "react";
import { Carousel, OngoingEventsTable } from "../../../components";
import { ongoingEvents } from "../../../data";

const ClientDashboard = () => {
  useLayoutEffect(() => {
    document.title = "ROHIT TRIAL"
  },[])
  return (
    <>
      <Carousel data={ongoingEvents} />
      <OngoingEventsTable />
    </>
  );
};

export default ClientDashboard;
