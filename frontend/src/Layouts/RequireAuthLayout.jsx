import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuthLayout = () => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  return <div>{token ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default RequireAuthLayout;
