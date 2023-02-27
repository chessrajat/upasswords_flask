import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import RootLayout from "./Layouts/RootLayout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> */}
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
