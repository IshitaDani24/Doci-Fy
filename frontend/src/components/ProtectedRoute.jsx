// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isloggedIn = localStorage.getItem("isloggedIn");

  return isloggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
