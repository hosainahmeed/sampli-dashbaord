import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./Redux/main/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API || ""}>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
