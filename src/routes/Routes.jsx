import React from 'react'
import MainLayout from '../layout/MainLayout'
import Login from '../pages/auth/Login.jsx'
import Otp from '../pages/auth/Otp.jsx'
import ChooseRole from '../pages/sampler/chooseRole/ChooseRole.jsx'
import Signup from '../pages/sampler/signup/Signup.jsx'
import SignUpOtp from '../pages/sampler/signup/SignUpOtp.jsx'
import SignUpMoreInformation from '../pages/sampler/signup/SignUpMoreInformation.jsx'
import SamplerHome from '../pages/sampler/SamplerHome/SamplerHome.jsx'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import DashboardHome from '../pages/Business/home/DashboardHome.jsx'
import SingleCampaign from '../pages/Business/SingleCampaign'
import ProductPage from '../pages/Business/Product/ProductPage.jsx'
import ResetPassword from '../pages/auth/ResetPassword.jsx'
import ForgetPassword from '../pages/auth/ForgetPassword.jsx'
import Register from '../pages/auth/Register.jsx'
import BusinessInfoForm from '../components/ui/BusinessInfoForm.jsx'
import UserInfo from '../components/ui/UserInfo.jsx'
import ContactInfo from '../components/ui/ContactInfo'
import ComplianceInfo from '../components/ui/ComplianceInfo.jsx'
import AddProduct from '../components/page-Component/AddProduct.jsx'
import SettingPage from '../pages/Business/setting/SettingPage.jsx'
import SalesPage from '../pages/Business/order/SalesPage.jsx'
import OrderDetails from '../pages/Business/order/OrderDetails.jsx'
import CampaignPage from '../pages/Business/Campaign/CampaignPage.jsx'
import CreateCampaign from '../pages/Business/Campaign/CreateCampaign.jsx'
import ExistingProduct from '../pages/Business/Campaign/ExistingProduct.jsx'
import SelectAllCategories from '../pages/sampler/signup/selectCategories/SelectAllCategories.jsx'
import AllOfferSampler from '../pages/sampler/SamplerHome/components/offer/AllOfferSampler.jsx'
import EarningsSampler from '../pages/sampler/SamplerHome/components/reviewsAndEarnings/EarningsSampler.jsx'
import TransactionHistorySampler from '../pages/sampler/SamplerHome/components/reviewsAndEarnings/TransactionHistorySampler.jsx'
import ShipmentAndAlertSampler from '../pages/sampler/SamplerHome/components/shipments/ShipmentAndAlertSampler.jsx'
import OfferShipmentsSampler from '../pages/sampler/SamplerHome/components/shipments/components/OfferShipmentsSampler.jsx'
import MyPurchasesSampler from '../pages/sampler/SamplerHome/components/shipments/components/MyPurchasesSampler.jsx'
import WishlistSampler from '../pages/sampler/SamplerHome/components/shipments/components/WishlistSampler.jsx'
import NotificationsSampler from '../pages/sampler/SamplerHome/components/shipments/components/NotificationsSampler.jsx'
import ReturnItemsSampler from '../pages/sampler/SamplerHome/components/shipments/components/ReturnItemsSampler.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <DashboardHome /> },
      { path: '/campaign', element: <CampaignPage /> },
      { path: '/create-campaign', element: <CreateCampaign /> },
      {
        path: '/create-campaign/existing-product',
        element: <ExistingProduct />,
      },
      { path: '/sales', element: <SalesPage /> },
      { path: '/product', element: <ProductPage /> },
      { path: '/product/add-product', element: <AddProduct /> },
      { path: '/settings', element: <SettingPage /> },
      { path: '/campaign/single-campaign', element: <SingleCampaign /> },
      { path: '/sales/single-order', element: <OrderDetails /> },
    ],
  },

  // Ahsan Mahfuz
  // campaign section
  {
    path: '/sampler/campaign',
    element: <SamplerHome />,
  },
  {
    path: '/sampler/campaign/all-offer',
    element: <AllOfferSampler />,
  },
  {
    path: '/sampler/campaign/all-offer',
    element: <AllOfferSampler />,
  },
  {
    path: '/sampler/campaign/earnings',
    element: <EarningsSampler />,
  },
  {
    path: '/sampler/campaign/transaction-history',
    element: <TransactionHistorySampler />,
  },

  {
    path: '/sampler/campaign/shipments',
    element: <ShipmentAndAlertSampler />,
    children: [
      { path: 'offer-shipments', element: <OfferShipmentsSampler /> },
      { path: 'my-purchases', element: <MyPurchasesSampler /> },
      { path: 'wishlist', element: <WishlistSampler /> },
      { path: 'notifications', element: <NotificationsSampler /> },
    ],
  },
  {
    path: '/sampler/campaign/return-items',
    element: <ReturnItemsSampler />,
  },

  // hossain
  { path: '/otp', element: <Otp /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/user-info', element: <UserInfo /> },
  { path: '/contact-info', element: <ContactInfo /> },
  { path: '/compliance-info', element: <ComplianceInfo /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/business-info', element: <BusinessInfoForm /> },
  { path: '/forgot-password', element: <ForgetPassword /> },

  // Ahsan Mahfuz
  { path: '/choose-role', element: <ChooseRole /> },
  { path: '/signup/reviewer', element: <Signup /> },
  { path: '/sign-up-otp', element: <SignUpOtp /> },
  { path: '/sign-up-more-info', element: <SignUpMoreInformation /> },
  { path: '/sign-up-select-all-categories', element: <SelectAllCategories /> },
])

{
  /* <ProtectedRoute>
        
      </ProtectedRoute> */
}
