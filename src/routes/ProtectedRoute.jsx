import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);

    if (location.pathname === "/") {
      if (decodedToken?.role === "bussinessOwner") {
        window.location.href = "/business-dashboard";
      } else if (decodedToken?.role === "reviewer") {
        window.location.href = "/sampler/campaign";
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [token, location.pathname, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin spinning={isLoading} size="large" />
      </div>
    );
  }

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
