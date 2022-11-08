import ClientLogIn from "./client/login/LogIn.component";
import AdminLogIn from "./admin/login/LogIn.component";
import MentorLogIn from "./mentor/login/LogIn.component";
import SuperAdminLogIn from "./superAdmin/login/LogIn.component";
import Register from "./client/register/Register.component";
import Error from "./error/error";
import EventDetails from "./client/eventdetails/EventDetails";
import ClientDashboard from "./client/client-dashboard/client-dashboard.page";
import AdminDashboard from "./admin/admin-dashboard/admin-dashboard.page";
import StatusPage from "./client/status/status.page";
import CreateEvent from "./client/form/form.page";
import SharedLayoutClient from "./client/client-dashboard/shared-layout.page";
import SharedLayoutAdmin from "./admin/admin-dashboard/shared-layout.page";
import MentorDashboard from "./mentor/mentor-dashboard/mentor-dashboard.page";
import SharedLayoutMentor from "./mentor/shared-layout.page";
import SuperAdminDashboard from "./superAdmin/superAdmin-dashboard/superAdmin-dashboard.page";
import SharedLayoutSuperAdmin from "./superAdmin/shared-layout.page";
import HomePage from "./home/home.page";
import Navbar from "./home/navbar";
import Contact from "./home/contact";
import AdminViewForm from "./admin/view-form/view-form.page";
import MentorViewForm from "./mentor/view-form/view-form.page";
import SuperAdminViewForm from "./superAdmin/view-form/view-form.page";
import VerifyEmail from "./client/register/email-verify.component";
import FormPage from "./client/form/form.page";

export {
  FormPage,
  ClientLogIn,
  AdminLogIn,
  MentorLogIn,
  SuperAdminLogIn,
  Register,
  Error,
  VerifyEmail,
  ClientDashboard,
  AdminDashboard,
  AdminViewForm,
  MentorDashboard,
  MentorViewForm,
  SuperAdminDashboard,
  SuperAdminViewForm,
  EventDetails,
  StatusPage,
  CreateEvent,
  SharedLayoutClient,
  SharedLayoutAdmin,
  SharedLayoutMentor,
  SharedLayoutSuperAdmin,
  HomePage,
  Navbar,
  Contact,
};
