import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components";
import { ThemeProvider } from "@mui/material/styles";
import SharedLayout from "./pages/client-dashboard/shared-layout.page";
import { ClientDashboard } from "./pages";
import { LogIn, Register, Error, EventDetails } from "./pages/index";
import { Footer } from "./components/index";
import { theme } from './theme/theme';


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/client"
            element={
              <ProtectedRoutes>
                <SharedLayout />
              </ProtectedRoutes>
            }
          >
          </Route>
          <Route index element={<ClientDashboard />} />
          <Route
            exact
            path="/login"
            element={<LogIn />}>
          </Route>
          <Route
            exact
            path="/register"
            element={<Register />}>
          </Route>
          <Route
            exact
            path="/events"
            element={<EventDetails />}>
          </Route>
          <Route
            exact
            path="*"
            element={<Error />}>
          </Route>

        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;