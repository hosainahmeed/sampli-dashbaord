import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../Redux/sampler/oAuthApis";
import { jwtDecode } from "jwt-decode";
import google from "../assets/socialsLogo/google.png";
import "./googleButton.css";
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
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="w-full relative">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            theme="outline"
            text="continue_with"
            size="large"
            shape="circle"
          />
          <div className="overlay-button absolute top-0 left-0 w-full h-full flex items-center justify-center gap-1 text-sm py-2 rounded-md cursor-pointer">
            <div className="flex px-3 py-2 rounded-4xl w-full items-center justify-center gap-1">
              <img src={google} alt="" className="w-5 h-5" />{" "}
              <span className="text-gray-600">Continue with Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthButton;
