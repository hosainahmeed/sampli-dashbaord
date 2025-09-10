import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const router = useNavigate()
  if (!token) {
    router('/login')
  }
  const decodedToken = token ? jwtDecode(token) : null;

  
  return decodedToken ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
