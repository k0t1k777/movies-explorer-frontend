import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  return loggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
