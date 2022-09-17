import * as React from 'react';
import { LogIn, Register, Error } from "./pages/index";
import { Footer } from "./components/index";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
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
    </>
  )
}

export default App;