import ClientDashboardNavbar from "./dashboard-navbar/client-dashboard-navbar.component";
import ProtectedRoutes from "./protected-routes/protected-routes.component";
import Carousel from "./carousel/carousel.component";
import OngoingEventsTable from "./ongoing-events-table/ongoing-events-table.component";
import PreviousStatusTable from "./previous-status-table/previous-state-table.component";
import Event from "./event/event.component";
import Footer from "./footer/Footer.component";
import TimeLine from "./timeline/timeline.component";
// import EventForm from "./event-form-display/event-form-display.component";
import EventApplicationForm from "./event-application-form.jsx/eventApplicationForm";


// ADMIN
import AdminDashboardNavbar from "./dashboard-navbar/admin-dashboard-navbar.component";
import OngoingEventsAdmin from "./ongoing-events-table-admin/ongoing-events.component";
import EventParticipants from "./event-participant/event-participant.component";

// MENTOR
import MentorDashboardNavbar from "./dashboard-navbar/mentor-dashboard-navbar.component";

// SUPER-ADMIN
import SuperAdminDashboardNavbar from "./dashboard-navbar/superAdmin-dashboard-navbar.component";

import EventFormSubmitted from "./submitted-event-form/submittedForm";

export {
  ClientDashboardNavbar,
  AdminDashboardNavbar,
  MentorDashboardNavbar,
  SuperAdminDashboardNavbar,
  ProtectedRoutes,
  Carousel,
  OngoingEventsTable,
  OngoingEventsAdmin,
  Event,
  TimeLine,
  PreviousStatusTable,
  EventParticipants,
  Footer,
  // EventForm,
  EventApplicationForm,
  EventFormSubmitted
};
