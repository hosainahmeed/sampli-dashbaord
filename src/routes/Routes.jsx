import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Otp from "../pages/auth/Otp.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import ForgetPassword from "../pages/auth/ForgetPassword.jsx";
import UserInfo from "../components/ui/UserInfo.jsx";
import ContactInfo from "../components/ui/ContactInfo";
import ComplianceInfo from "../components/ui/ComplianceInfo.jsx";
import BusinessInfoForm from "../components/ui/BusinessInfoForm.jsx";
import ChooseRole from "../pages/sampler/chooseRole/ChooseRole.jsx";
import Signup from "../pages/sampler/signup/Signup.jsx";
import SignUpOtp from "../pages/sampler/signup/SignUpOtp.jsx";
import SignUpMoreInformation from "../pages/sampler/signup/SignUpMoreInformation.jsx";
import SelectAllCategories from "../pages/sampler/signup/selectCategories/SelectAllCategories.jsx";
import { businessRoutes } from "./businessRoutes.jsx";
import { samplerRoutes } from "./samplerRoutes.jsx";
import BusinessSendOtp from "../pages/Business/business_auth/BusinessSendOtp.jsx";

export const router = createBrowserRouter([
  businessRoutes,
  samplerRoutes,

  // shared/auth routes
  { path: "/otp", element: <Otp /> },
  { path: "/login", element: <Login /> },
  { path: "/signup/business", element: <Register /> },
  { path: "/user-info", element: <UserInfo /> },
  { path: "/contact-info", element: <ContactInfo /> },
  { path: "/compliance-info", element: <ComplianceInfo /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/business-info", element: <BusinessInfoForm /> },
  { path: "/forgot-password", element: <ForgetPassword /> },

  // sampler signup flow
  { path: "/choose-role", element: <ChooseRole /> },
  { path: "/signup/reviewer", element: <Signup /> },
  { path: "/sign-up-otp", element: <SignUpOtp /> },
  { path: "/sign-up-more-info", element: <SignUpMoreInformation /> },
  { path: "/sign-up-select-all-categories", element: <SelectAllCategories /> },
  { path: "/business/otp", element: <BusinessSendOtp /> }
]);
