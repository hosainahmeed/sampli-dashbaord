import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../Redux/sampler/oAuthApis";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = ({ role, loginForm }) => {
  const navigate = useNavigate();
  const [googleLogin] = useGoogleLoginMutation();
  const handleGoogleSuccess = async (credentialResponse) => {
    if (!role && !loginForm) throw new Error("Role is required");
    if (!credentialResponse?.credential)
      throw new Error("Credential is required");
    try {
      const data = {
        provider: "google",
        token: credentialResponse.credential,
        role: role,
      };
      await googleLogin({ data })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            if (res?.data?.accessToken) {
              localStorage.setItem("token", res?.data?.accessToken);
              const decoded = jwtDecode(res?.data?.accessToken);

              if (loginForm) {
                if (decoded?.role === "reviewer" && role !== "reviewer") {
                  window.location.href = "/sampler/campaign";
                }
                if (
                  decoded?.role === "bussinessOwner" &&
                  role !== "bussinessOwner"
                ) {
                  window.location.href = "/business-dashboard";
                }
              }

              if (
                decoded?.role === "reviewer" &&
                role !== "reviewer" &&
                res?.data?.isNewUser === true
              ) {
                window.location.href = "/sampler/campaign";
              }

              if (
                decoded?.role === "bussinessOwner" &&
                role !== "bussinessOwner" &&
                res?.data?.isNewUser === true
              ) {
                window.location.href = "/business-dashboard";
              }

              if (decoded?.role === "reviewer" && role === "reviewer") {
                window.location.href = "/sign-up-more-info";
              }

              if (
                decoded?.role === "bussinessOwner" &&
                role === "bussinessOwner"
              ) {
                window.location.href = "/business-info";
              }
              // if (decoded?.role === "reviewer" && role === "reviewer" && res?.data?.isNewUser !== true) {
              //   window.location.href = "/sign-up-more-info";
              // }

              // if (decoded?.role === "bussinessOwner" && role === "bussinessOwner" && res?.data?.isNewUser !== true) {
              //   window.location.href = "/business-info";
              // }
            }
          } else {
            throw new Error(res?.message || "Something went wrong");
          }
        });
    } catch (error) {
      toast.dismiss();
      toast.error(
        error?.data?.message ||
        error?.message ||
        error?.error ||
        "Something went wrong"
      );
      console.log("===========error", error);
      if (
        error?.data?.message ===
        "User validation failed: role: Path `role` is required." &&
        error?.status === 503
      ) {
        toast.dismiss();
        toast.error("Please select a role for proceed");
        navigate("/choose-role");
      }
    }
  };

  const handleGoogleError = (error) => {
    console.log(error);
    toast.error(
      error?.data?.message ||
      error?.message ||
      error?.error ||
      "Something went wrong"
    );
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
      useOneTap={false}
      theme="filled_blue"
      text="continue_with"
      size="large"
      shape="circle"
    />
  );
};

export default GoogleAuthButton;
