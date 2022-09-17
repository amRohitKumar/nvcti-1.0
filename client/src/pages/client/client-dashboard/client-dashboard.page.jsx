import { Carousel, OngoingEventsTable } from "../../../components";
import { ongoingEvents } from "../../../data";

const ClientDashboard = () => {
  
  return (
    <>
      <Carousel data={ongoingEvents} />
      <OngoingEventsTable />
    </>
  );
};

export default ClientDashboard;
