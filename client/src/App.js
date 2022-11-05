import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { EventParticipants, ProtectedRoutes, Footer } from "./components";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ClientLogIn,
  AdminLogIn,
  MentorLogIn,
  SuperAdminLogIn,
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
  AdminViewForm,
  MentorViewForm,
  SuperAdminViewForm,
  VerifyEmail,
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
          <Route exact path="/login" element={<ClientLogIn />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/auth/verify-email/:emailToken" element={<VerifyEmail />} />
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
            <Route path="event/:eventId" element={<EventDetails />}></Route>
          </Route>

          {/* ADMIN LOGIN ROUTES */}
          <Route exact path="/adminlogin" element={<AdminLogIn />}></Route>
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
            <Route path="event/:eventId/response/:userId" element={<AdminViewForm />} />
          </Route>

          {/* MENTOR LOGIN ROUTES*/}
          <Route exact path="/mentorlogin" element={<MentorLogIn />}></Route>
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
            <Route path="response/:candidateId" element={<MentorViewForm />} />
          </Route>

          {/* SUPER-ADMIN LOGIN ROUTES */}
          <Route
            exact
            path="/superadminlogin"
            element={<SuperAdminLogIn />}
          ></Route>
          {/* SUPER-ADMIN PROTEDTED ROUTES */}
          <Route
            path="/superadmin"
            element={
              <ProtectedRoutes userRole="superAdmin">
                <SharedLayoutSuperAdmin />
              </ProtectedRoutes>
            }
          >
            <Route index element={<SuperAdminDashboard />} />
            <Route
              path="response/:candidateId"
              element={<SuperAdminViewForm />}
            />
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
