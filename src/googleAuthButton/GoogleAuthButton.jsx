import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../Redux/sampler/oAuthApis";
import { jwtDecode } from "jwt-decode";

const GoogleAuthButton = ({ role }) => {
  const [googleLogin] = useGoogleLoginMutation();

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Login Success:", credentialResponse);

    if (!credentialResponse?.credential) return;

    try {
      const data = {
        provider: "google",
        token: credentialResponse.credential,
        role: role || undefined,
      };
      const res = await googleLogin({ data }).unwrap();
      console.log(res);
      if (res?.data?.accessToken) {
        localStorage.setItem("token", res?.data?.accessToken);
        const decoded = jwtDecode(res?.data?.accessToken);

        if (decoded?.role === "reviewer" && role !== "reviewer") {
          window.location.href = "/sampler/campaign";
        }

        if (decoded?.role === "bussinessOwner" && role !== "bussinessOwner") {
          window.location.href = "/business-dashboard";
        }

        if (decoded?.role === "reviewer" && role === "reviewer") {
          window.location.href = "/sign-up-more-info";
        }

        if (decoded?.role === "bussinessOwner" && role === "bussinessOwner") {
          window.location.href = "/business-info";
        }
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap={false}
        theme="outline"
        text="continue_with"
        size="large"
        shape="circle"
        width="1"
      />
    </div>
  );
};

export default GoogleAuthButton;
