import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes, Footer } from "./components";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import {
  LogIn,
  Register,
  Error,
  EventDetails,
  ClientDashboard,
  StatusPage,
  EventFormPage,
  Home,
  About,
  Missions,
  Videos,
  Navbar,
} from "./pages";
import SharedLayoutClient from "./pages/client/client-dashboard/shared-layout.page";
import { HelmetProvider } from 'react-helmet-async';


function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/" element={
              <>
                <Navbar />
                <Home />
                <About />
                <Missions />
                <Videos />
              </>
            }></Route>

            {/* CLIENT LOGIN/REGISTER ROUTES */}
            <Route exact path="/login" element={<LogIn />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="*" element={<Error />}></Route>

            {/* CLIENT PROTECTED ROUTES */}
            <Route
              path="/client"
              element={
                <ProtectedRoutes>
                  <SharedLayoutClient />
                </ProtectedRoutes>
              }
            >
              <Route index element={<ClientDashboard />} />
              <Route path="status" element={<StatusPage />} />
              <Route path="apply/:eventId" element={<EventFormPage />} />
              <Route path="events/:eventId" element={<EventDetails />} />
            </Route>

            {/* ADMIN LOGIN ROUTES */}
            {/* ADMIN PROTECTED ROUTES */}

            {/* MENTOR LOGIN ROUTES*/}
            {/* MENTOR PROTECTED ROUTES */}

            {/* SUPER-ADMIN LOGIN ROUTES */}
            {/* SUPER-ADMIN PROTEDTED ROUTES */}

          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
