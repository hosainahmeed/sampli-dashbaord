import React from "react";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../pages/Business/home/DashboardHome";
import CampaignPage from "../pages/Business/Campaign/CampaignPage";
import CreateCampaign from "../pages/Business/Campaign/CreateCampaign";
import ExistingProduct from "../pages/Business/Campaign/ExistingProduct";
import SalesPage from "../pages/Business/order/SalesPage";
import ProductPage from "../pages/Business/Product/ProductPage";
import AddProduct from "../components/page-Component/AddProduct";
import SettingPage from "../pages/Business/setting/SettingPage";
import SingleCampaign from "../pages/Business/SingleCampaign";
import EditCampaign from "../pages/Business/EditCampaign/EditCampaign";
import OrderDetails from "../pages/Business/order/OrderDetails";
import StoreProfile from "../pages/Business/store-profile/StoreProfile";
import AllNotificationPage from "../pages/Business/NotificationPage/AllNotificationPage";
import TransectionOfBusiness from "../pages/Business/balance/TransectionOfBusiness";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import AddVariant from "../components/page-Component/AddVariant";
import EditProduct from "../components/page-Component/EditProduct";
import ProductDetails from "../pages/Business/Product/ProductDetails";
import DetailsPurchasesProduct from "../pages/Business/PurchasesBusiness/DetailsPurchasesProduct";
import OrderSuccess from "../pages/Business/order/OrderSuccess";
import PurchasesBusiness from "../pages/Business/PurchasesBusiness/PurchasesBusiness";

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
      path: "/product/:productId",
      element: <ProductDetails />,
    },
    { path: "/business/purchases", element: <PurchasesBusiness /> },
    { path: "/business/purchases/:id", element: <DetailsPurchasesProduct /> },
    { path: '/order/success', element: <OrderSuccess /> },
  ],
};
