import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation()
  const router = useNavigate()
  if (!token) {
    router('/login')
  }
  const decodedToken = token ? jwtDecode(token) : null;

  if (location.pathname === '/') {
    console.log(decodedToken?.role)
    if (window !== undefined) {
      if (decodedToken?.role === 'bussinessOwner') {
        window.location.href = '/business-dashboard'
      }
      if (decodedToken?.role === 'reviewer') {
        window.location.href = '/campaign'
      }
    }
  }


  return decodedToken ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
