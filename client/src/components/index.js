import ClientDashboardNavbar from "./dashboard-navbar/client-dashboard-navbar.component";
import ProtectedRoutes from "./protected-routes/protected-routes.component";
import Footer from "./footer/Footer.component";
import TimeLine from "./timeline/timeline.component";
import Carousel from "./carousel/carousel.component";
// import EventForm from "./event-form-display/event-form-display.component";
import LogIn from "./login/login.component";
import NVCTILogo from "./logo/logo.component";
import CircularLoader from "./loader/circular-loader.component";
import PreviousApplications from "./previous-status-table/previous-state-table.component";
import OngoingEventsTable from "./ongoing-events-table/ongoing-events-table.component";
// import ViewFormApplication from "./view-form/form.page";
import EventPage from './event-detail/event-detail.page';

// ADMIN
import AdminDashboardNavbar from "./dashboard-navbar/admin-dashboard-navbar.component";
import ApplicationsList from "./event-participant/event-participant.component";
import EventFormSubmitted from "./submitted-event-form/submittedForm";
import EventParticipants from './event-participant/event-participant.component';
// MENTOR
import MentorDashboardNavbar from "./dashboard-navbar/mentor-dashboard-navbar.component";

// SUPER-ADMIN
import SuperAdminDashboardNavbar from "./dashboard-navbar/superAdmin-dashboard-navbar.component";


export {
  EventParticipants,
  EventFormSubmitted,
  EventPage,
  OngoingEventsTable,
  Carousel,
  CircularLoader,
  NVCTILogo,
  LogIn,
  ClientDashboardNavbar,
  AdminDashboardNavbar,
  MentorDashboardNavbar,
  SuperAdminDashboardNavbar,
  ProtectedRoutes,
  TimeLine,
  PreviousApplications,
  Footer,
  ApplicationsList,
  // ViewFormApplication,
};
