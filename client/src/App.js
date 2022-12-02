import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ProtectedRoutes, Footer, LogIn, EventPage, EventParticipants } from "./components";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Register,
  Error,
  ClientDashboard,
  AdminDashboard,
  HomePage,
  SharedLayoutAdmin,
  SharedLayoutClient,
  Contact,
  Navbar,
  VerifyEmail,
  // FormApplication,
  EventForm,
  CreateEvent,
} from "./pages";
// import { ViewFormApplication } from "./components";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />

          {/* CLIENT REGISTER ROUTES */}
          <Route exact path="/register" element={<Register />} />
          {/* EMAIL VERIFY ROUTE */}
          <Route
            exact
            path="/auth/verify-email/:emailToken"
            element={<VerifyEmail />}
          />
          {/* LOGIN ROUTE */}
          <Route exact path="/login" element={<LogIn />} />
          {/* VIEW APPLICATION ROUTE */}
          {/* <Route path="view/:formId" element={<ViewFormApplication />} /> */}

          {/* CLIENT PROTECTED ROUTES */}
          <Route
            path="/client"
            element={
              <ProtectedRoutes userRole="user">
                <SharedLayoutClient />
              </ProtectedRoutes>
            }
          >
            <Route index element={<ClientDashboard />} />
            {/* <Route path="status" element={<FormApplication />} /> */}
            <Route path="event/:eventId" element={<EventPage />} />
            <Route path="apply/:eventId" element={<EventForm />} />
          </Route>

          {/* ADMIN PROTECTED ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoutes userRole="admin">
                <SharedLayoutAdmin />
              </ProtectedRoutes>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="create" element={<CreateEvent />} />
            <Route path="event/:eventId" element={<EventPage role="ADMIN" />} />
            <Route path="event/:eventId/applications" element={<EventParticipants />} />
          </Route>

          {/* ERROR ROUTE */}
          <Route exact path="*" element={<Error />}></Route>
        </Routes>
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          limit={1}
          draggable
          pauseOnHover
        />
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
