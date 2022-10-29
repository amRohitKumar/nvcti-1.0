import { Carousel, OngoingEventsTable } from "../../../components";
import { ongoingEvents } from "../../../data";
import { useTitle } from "../../../hooks";

const ClientDashboard = () => {
  useTitle("Dashboard");
  return (
    <>
      <Carousel data={ongoingEvents} />
      <OngoingEventsTable />
    </>
  );
};

export default ClientDashboard;
