import React from "react";
import MainLayout from "../layout/MainLayout.jsx";
import DashboardHome from "../pages/Business/home/DashboardHome.jsx";
import CampaignPage from "../pages/Business/Campaign/CampaignPage.jsx";
import CreateCampaign from "../pages/Business/Campaign/CreateCampaign.jsx";
import ExistingProduct from "../pages/Business/Campaign/ExistingProduct.jsx";
import SalesPage from "../pages/Business/order/SalesPage.jsx";
import ProductPage from "../pages/Business/Product/ProductPage.jsx";
import AddProduct from "../components/page-Component/AddProduct.jsx";
import SettingPage from "../pages/Business/setting/SettingPage.jsx";
import SingleCampaign from "../pages/Business/SingleCampaign.jsx";
import EditCampaign from "../pages/Business/EditCampaign/EditCampaign.jsx";
import OrderDetails from "../pages/Business/order/OrderDetails.jsx";
import StoreProfile from "../pages/Business/store-profile/StoreProfile.jsx";
import AllNotificationPage from "../pages/Business/NotificationPage/AllNotificationPage.jsx";
import TransectionOfBusiness from "../pages/Business/balance/TransectionOfBusiness.jsx";
import PageNotFound from "../pages/pageNotFound/PageNotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AddVariant from "../components/page-Component/AddVariant.jsx";
import EditProduct from "../components/page-Component/EditProduct";
import ProductDetails from "../pages/Business/Product/ProductDetails";

export const businessRoutes = {
  path: "/",
  errorElement: <PageNotFound />,
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: "/business-dashboard", element: <DashboardHome />, index: true },
    { path: "/campaign", element: <CampaignPage /> },
    { path: "/create-campaign", element: <CreateCampaign /> },
    { path: "/create-campaign/existing-product", element: <ExistingProduct /> },
    { path: "/sales", element: <SalesPage /> },
    { path: "/product", element: <ProductPage /> },
    { path: "/product/add-product", element: <AddProduct /> },
    { path: "/edit-product/:productId", element: <EditProduct /> },
    { path: "/add-variant/:productId", element: <AddVariant /> },
    { path: "/settings", element: <SettingPage /> },
    { path: "/campaign/single-campaign", element: <SingleCampaign /> },
    {
      path: "/campaign/single-campaign/edit-campaign",
      element: <EditCampaign />,
    },
    { path: "/sales/single-order", element: <OrderDetails /> },
    { path: "/store-profile", element: <StoreProfile /> },
    { path: "/all-notifications", element: <AllNotificationPage /> },
    {
      path: "/business/transaction-balance",
      element: <TransectionOfBusiness />,
    },
    {
      path: "product/:productId",
      element: <ProductDetails />,
    }
  ],
};
