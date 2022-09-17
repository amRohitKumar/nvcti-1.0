import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components";
import { ThemeProvider } from "@mui/material/styles";
import {theme} from './theme';
import SharedLayout from "./pages/client-dashboard/shared-layout.page";
import { ClientDashboard } from "./pages";

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
            <Route index element={<ClientDashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
