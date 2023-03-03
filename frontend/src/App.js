import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home";
import RootLayout from "./Layouts/RootLayout";

const isAuthenticated = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
