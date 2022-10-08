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
  StatusPage,
  EventFormPage,
  SharedLayoutAdmin,
  SharedLayoutClient,
  CreateEvent
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
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
            <Route path="event/:eventId" element={<EventParticipants/>} />
          </Route>

          {/* MENTOR LOGIN ROUTES*/}
          {/* MENTOR PROTECTED ROUTES */}

          {/* SUPER-ADMIN LOGIN ROUTES */}
          {/* SUPER-ADMIN PROTEDTED ROUTES */}
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
