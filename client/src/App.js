import * as React from 'react';
import { LogIn, Register, Error } from "./pages/index";
import { Footer } from "./components/index";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './theme/theme';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
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
            path="*"
            element={<Error />}>
          </Route>
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  )
}

export default App;