import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ProtectedRoutes, Footer, LogIn } from "./components";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Register,
  Error,
  ClientDashboard,
  AdminDashboard,
  MentorDashboard,
  SuperAdminDashboard,
  HomePage,
  SharedLayoutAdmin,
  SharedLayoutClient,
  SharedLayoutMentor,
  SharedLayoutSuperAdmin,
  Contact,
  Navbar,
  VerifyEmail,
  FormApplication,
} from "./pages";
import { ViewFormApplication } from "./components";

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
          <Route path="view/:formId" element={<ViewFormApplication />} />

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
            <Route path="apply" element={<FormApplication />} />
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
          </Route>

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
