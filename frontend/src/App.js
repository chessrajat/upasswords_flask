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
import RequireAuthLayout from "./Layouts/RequireAuthLayout";
import RootLayout from "./Layouts/RootLayout";

const isAuthenticated = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<RequireAuthLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
