import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { EventParticipants, Footer, ProtectedRoutes } from "./components";
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
  Home,
  About,
  Missions,
  Videos,
  Navbar,
  SharedLayoutAdmin,
  SharedLayoutClient,
  CreateEvent,
  SharedLayoutMentor,
  SharedLayoutSuperAdmin,
  Contact,
} from "./pages";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                  <About />
                  <Missions />
                  <Videos />
                </>
              }
            ></Route>
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
            <Route exact path="*" element={<Error />}></Route>
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
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
