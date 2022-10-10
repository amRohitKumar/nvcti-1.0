import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { EventParticipants, ProtectedRoutes, Footer, EventFormSubmitted } from "./components";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import {
  LogIn,
  Register,
  Error,
  EventDetails,
  ClientDashboard,
  AdminDashboard,
  MentorDashboard,
  SuperAdminDashboard,
  StatusPage,
  EventFormPage,
  HomePage,
  SharedLayoutAdmin,
  SharedLayoutClient,
  CreateEvent,
  SharedLayoutMentor,
  SharedLayoutSuperAdmin,
  Contact,
  Navbar,
} from "./pages";

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

          {/* CLIENT LOGIN/REGISTER ROUTES */}
          <Route exact path="/login" element={<LogIn />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
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
            <Route path="status" element={<StatusPage />} />
            <Route path="apply/:eventId" element={<EventFormPage />} />
            <Route path="events" element={<EventDetails />}></Route>
          </Route>
          {/* ADMIN LOGIN ROUTES */}
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
            <Route path="event/:eventId" element={<EventParticipants />} />
          </Route>

          {/* MENTOR LOGIN ROUTES*/}
          {/* MENTOR PROTECTED ROUTES */}
          <Route
            path="/mentor"
            element={
              <ProtectedRoutes userRole="mentor">
                <SharedLayoutMentor />
              </ProtectedRoutes>
            }
          >
            <Route index element={<MentorDashboard />} />
            <Route exact path="response/:CandidateId"
              element={<EventFormSubmitted />} />
          </Route>

          {/* SUPER-ADMIN LOGIN ROUTES */}
          {/* SUPER-ADMIN PROTEDTED ROUTES */}
          <Route
            path="/superAdmin"
            element={
              <ProtectedRoutes userRole="superAdmin">
                <SharedLayoutSuperAdmin />
              </ProtectedRoutes>
            }
          >
            <Route index element={<SuperAdminDashboard />} />
          </Route>

          {/* ERROR ROUTE */}
          <Route exact path="*" element={<Error />}></Route>
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
