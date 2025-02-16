import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../layout/MainLayout'
import DashboardHome from '../pages/DashboardHome'
import CampaignPage from '../pages/CampaignPage'
import SingleCampaign from '../pages/SingleCampaign'
import ProductPage from '../pages/ProductPage'
import SalesPage from '../pages/SalesPage'
import CreateCampaign from '../pages/CreateCampaign'
import ExistingProduct from '../pages/ExistingProduct'
import Login from '../pages/auth/Login.jsx'
import Otp from '../pages/auth/Otp.jsx'
import ResetPassword from '../pages/auth/ResetPassword.jsx'
import ForgetPassword from '../pages/auth/ForgetPassword.jsx'
import Register from '../pages/auth/Register.jsx'
import BusinessInfoForm from '../components/ui/BusinessInfoForm.jsx'
import UserInfo from '../components/ui/UserInfo.jsx'
import ContactInfo from '../components/ui/ContactInfo'
import ComplianceInfo from '../components/ui/ComplianceInfo.jsx'
import AddProduct from '../components/page-Component/AddProduct.jsx'
import SettingPage from '../pages/SettingPage.jsx'
import OrderDetails from '../pages/OrderDetails/OrderDetails.jsx'
import ChooseRole from '../pages/sampler/chooseRole/ChooseRole.jsx'

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

      // Ahsan Mahfuz
    ],
  },
  { path: '/otp', element: <Otp /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/user-info', element: <UserInfo /> },
  { path: '/contact-info', element: <ContactInfo /> },
  { path: '/compliance-info', element: <ComplianceInfo /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/business-info', element: <BusinessInfoForm /> },
  { path: '/forgot-password', element: <ForgetPassword /> },
  { path: '/choose-role', element: <ChooseRole /> },

  // Ahsan Mahfuz
])

{
  /* <ProtectedRoute>
        
      </ProtectedRoute> */
}
