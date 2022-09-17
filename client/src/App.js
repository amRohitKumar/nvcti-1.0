import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import {theme} from './theme';
import SharedLayoutClient from "./pages/client/client-dashboard/shared-layout.page";
import { ClientDashboard, StatusPage } from "./pages";

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
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
