// src/component/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have an AuthContext

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Replace with your authentication logic

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
