import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components";
import { ThemeProvider } from "@mui/material/styles";
import { Footer } from "./components/index";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import {
  LogIn,
  Register,
  Error,
  EventDetails,
  ClientDashboard,
  StatusPage,
} from "./pages";
import SharedLayoutClient from "./pages/client/client-dashboard/shared-layout.page";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
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
          </Route>
          <Route index element={<ClientDashboard />} />
          <Route exact path="/login" element={<LogIn />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/events" element={<EventDetails />}></Route>
          <Route exact path="*" element={<Error />}></Route>
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
