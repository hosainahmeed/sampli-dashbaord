import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../pages/Business/home/DashboardHome.jsx";
import SingleCampaign from "../pages/Business/SingleCampaign";
import ProductPage from "../pages/Business/Product/ProductPage.jsx";
import Login from "../pages/auth/Login.jsx";
import Otp from "../pages/auth/Otp.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import ForgetPassword from "../pages/auth/ForgetPassword.jsx";
import Register from "../pages/auth/Register.jsx";
import BusinessInfoForm from "../components/ui/BusinessInfoForm.jsx";
import UserInfo from "../components/ui/UserInfo.jsx";
import ContactInfo from "../components/ui/ContactInfo";
import ComplianceInfo from "../components/ui/ComplianceInfo.jsx";
import AddProduct from "../components/page-Component/AddProduct.jsx";
import SettingPage from "../pages/Business/setting/SettingPage.jsx";
import SalesPage from "../pages/Business/order/SalesPage.jsx";
import OrderDetails from "../pages/Business/order/OrderDetails.jsx";
import CampaignPage from "../pages/Business/Campaign/CampaignPage.jsx";
import CreateCampaign from "../pages/Business/Campaign/CreateCampaign.jsx";
import ExistingProduct from "../pages/Business/Campaign/ExistingProduct.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <DashboardHome /> },
      { path: "/campaign", element: <CampaignPage /> },
      { path: "/create-campaign", element: <CreateCampaign /> },
      {
        path: "/create-campaign/existing-product",
        element: <ExistingProduct />,
      },
      { path: "/sales", element: <SalesPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/product/add-product", element: <AddProduct /> },
      { path: "/settings", element: <SettingPage /> },
      { path: "/campaign/single-campaign", element: <SingleCampaign /> },
      { path: "/sales/single-order", element: <OrderDetails /> },
    ],
  },
  { path: "/otp", element: <Otp /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/user-info", element: <UserInfo /> },
  { path: "/contact-info", element: <ContactInfo /> },
  { path: "/compliance-info", element: <ComplianceInfo /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/business-info", element: <BusinessInfoForm /> },
  { path: "/forgot-password", element: <ForgetPassword /> },
]);

{
  /* <ProtectedRoute>
        
      </ProtectedRoute> */
}
