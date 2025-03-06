import React from "react";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/auth/Login.jsx";
import Otp from "../pages/auth/Otp.jsx";
import ChooseRole from "../pages/sampler/chooseRole/ChooseRole.jsx";
import Signup from "../pages/sampler/signup/Signup.jsx";
import SignUpOtp from "../pages/sampler/signup/SignUpOtp.jsx";
import SignUpMoreInformation from "../pages/sampler/signup/SignUpMoreInformation.jsx";
import SamplerHome from "../pages/sampler/SamplerHome/SamplerHome.jsx";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardHome from "../pages/Business/home/DashboardHome.jsx";
import SingleCampaign from "../pages/Business/SingleCampaign";
import ProductPage from "../pages/Business/Product/ProductPage.jsx";
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
import SelectAllCategories from "../pages/sampler/signup/selectCategories/SelectAllCategories.jsx";
import AllOfferSampler from "../pages/sampler/SamplerHome/components/offer/AllOfferSampler.jsx";
import EarningsSampler from "../pages/sampler/SamplerHome/components/reviewsAndEarnings/EarningsSampler.jsx";
import TransactionHistorySampler from "../pages/sampler/SamplerHome/components/reviewsAndEarnings/TransactionHistorySampler.jsx";
import ShipmentAndAlertSampler from "../pages/sampler/SamplerHome/components/shipments/ShipmentAndAlertSampler.jsx";
import OfferShipmentsSampler from "../pages/sampler/SamplerHome/components/shipments/components/OfferShipmentsSampler.jsx";
import MyPurchasesSampler from "../pages/sampler/SamplerHome/components/shipments/components/MyPurchasesSampler.jsx";
import WishlistSampler from "../pages/sampler/SamplerHome/components/shipments/components/WishlistSampler.jsx";
import NotificationsSampler from "../pages/sampler/SamplerHome/components/shipments/components/NotificationsSampler.jsx";
import ReturnItemsSampler from "../pages/sampler/SamplerHome/components/shipments/components/ReturnItemsSampler.jsx";
import SettingsSampler from "../pages/sampler/settings/SettingsSampler.jsx";
import BasicDetailsSettingsSampler from "../pages/sampler/settings/components/basicdetails/BasicDetailsSettingsSampler.jsx";
import PreferencesSettingsSampler from "../pages/sampler/settings/components/preferences/PreferencesSettingsSampler.jsx";
import SecuritySettingsSampler from "../pages/sampler/settings/components/security/SecuritySettingsSampler.jsx";
import NotificationsSettingsSampler from "../pages/sampler/settings/components/notifications/NotificationsSettingsSampler.jsx";
import StoreProfile from "../pages/Business/store-profile/StoreProfile.jsx";
import AllNotificationPage from "../pages/Business/NotificationPage/AllNotificationPage.jsx";
import MyProfileSampler from "../pages/sampler/profile/MyProfileSampler.jsx";
import ShopHeroPage from "../pages/sampler/shop/shopHeroPage/ShopHeroPage.jsx";
import ServiceWithCategory from "../pages/sampler/shop/serviceWithCategory/ServiceWithCategory.jsx";
import ServiceWithCategoryProductDetails from "../pages/sampler/shop/serviceWithCategoryProductDetails/ServiceWithCategoryProductDetails.jsx";
import SamplerFeed from "../pages/sampler/samplerFeed/SamplerFeed.jsx";
import TransectionOfBusiness from "../pages/Business/balance/TransectionOfBusiness.jsx";
import SamplerLayout from "../pages/sampler/samplerLayout/SamplerLayout.jsx";
import TermsAndConditions from "../pages/termsAndConditions/TermsAndConditions.jsx";
import ContactUs from "../pages/contactUs/ContactUs.jsx";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy.jsx";
import ProductListCheckoutSampler from "../pages/sampler/productListCheckoutSampler/ProductListCheckoutSampler.jsx";
import EditCampaign from "../pages/Business/EditCampaign/EditCampaign.jsx";
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
      { path: "/campaign/single-campaign/edit-campaign", element: <EditCampaign /> },
      { path: "/sales/single-order", element: <OrderDetails /> },
      { path: "/store-profile", element: <StoreProfile /> },
      { path: "/all-notifications", element: <AllNotificationPage /> },
      {
        path: "/business/transaction-balance",
        element: <TransectionOfBusiness />,
      },
    ],
  },

  // Ahsan Mahfuz
  // campaign section

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <SamplerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/sampler/campaign",
        element: <SamplerHome />,
      },
      {
        path: "/sampler/campaign/all-offer",
        element: <AllOfferSampler />,
      },

      {
        path: "/sampler/campaign/earnings",
        element: <EarningsSampler />,
      },
      {
        path: "/sampler/campaign/transaction-history",
        element: <TransactionHistorySampler />,
      },

      {
        path: "/sampler/campaign/shipments",
        element: <ShipmentAndAlertSampler />,
        children: [
          { path: "offer-shipments", element: <OfferShipmentsSampler /> },
          { path: "my-purchases", element: <MyPurchasesSampler /> },
          { path: "wishlist", element: <WishlistSampler /> },
          { path: "notifications", element: <NotificationsSampler /> },
        ],
      },
      {
        path: "/sampler/campaign/return-items",
        element: <ReturnItemsSampler />,
      },
      {
        path: "/sampler/settings",
        element: <SettingsSampler />,
        children: [
          {
            path: "basic-details-settings-sampler",
            element: <BasicDetailsSettingsSampler />,
          },
          {
            path: "preferences-settings-sampler",
            element: <PreferencesSettingsSampler />,
          },
          {
            path: "security-settings-sampler",
            element: <SecuritySettingsSampler />,
          },
          {
            path: "notifications-settings-sampler",
            element: <NotificationsSettingsSampler />,
          },
        ],
      },
      {
        path: "/sampler/my-profile",
        element: <MyProfileSampler />,
      },
      {
        path: "/sampler/shop",
        element: <ShopHeroPage />,
      },
      {
        path: `/sampler/shop/:name`,
        element: <ServiceWithCategory />,
      },
      {
        path: `/sampler/shop/:name/:id`,
        element: <ServiceWithCategoryProductDetails />,
      },
      {
        path: `/sampler/feed`,
        element: <SamplerFeed />,
      },

      {
        path: `/sampler/checkout`,
        element: <ProductListCheckoutSampler />,
      },
      { path: "/terms-and-conditions", element: <TermsAndConditions /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
    ],
  },

  // hossain
  { path: "/otp", element: <Otp /> },
  { path: "/login", element: <Login /> },
  { path: "/signup/business", element: <Register /> },
  { path: "/user-info", element: <UserInfo /> },
  { path: "/contact-info", element: <ContactInfo /> },
  { path: "/compliance-info", element: <ComplianceInfo /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/business-info", element: <BusinessInfoForm /> },
  { path: "/forgot-password", element: <ForgetPassword /> },

  // Ahsan Mahfuz
  { path: "/choose-role", element: <ChooseRole /> },
  { path: "/signup/reviewer", element: <Signup /> },
  { path: "/sign-up-otp", element: <SignUpOtp /> },
  { path: "/sign-up-more-info", element: <SignUpMoreInformation /> },
  { path: "/sign-up-select-all-categories", element: <SelectAllCategories /> },
]);
