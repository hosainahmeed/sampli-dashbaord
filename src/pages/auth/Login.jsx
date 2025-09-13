import React from "react";
import { Button, Typography, Divider } from "antd";
import { AppleOutlined, GoogleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Logo from "../../components/ui/Logo";
import { TiSocialFacebook } from "react-icons/ti";
import InputField from "../../components/ui/InputField";
import FormWrapper from "../../components/ui/FormWrapper";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../Redux/authApis";

import { jwtDecode } from "jwt-decode";

const { Title } = Typography;

const LoginForm = () => {
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const onFinish = async (values) => {
    if (values.email && values.password) {
      try {
        await login(values)
          .unwrap()
          .then((res) => {
            if (res?.success) {
              console.log(res);
              if (!loginLoading) {
                const token = res?.data?.accessToken;
                const decoded = jwtDecode(token);
                localStorage.setItem("token", token);
                if (decoded?.role === "reviewer") {
                  toast.success(res?.message);
                  if (window !== undefined) {
                    window.location.href = "/sampler/campaign";
                  }
                } else if (decoded?.role === "bussinessOwner") {
                  toast.success(res?.message);
                  if (window !== undefined) {
                    window.location.href = "/business-dashboard";
                  }
                }
              }
            }
          });
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 gradient-container">
      <div className="gradient-ellipse "></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={2} className="mb-1">
            Welcome
          </Title>
          <h1 className="text-[var(--body-text)]">Continue to Sampli</h1>
        </div>

        <FormWrapper onFinish={onFinish}>
          <InputField
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email address!" },
            ]}
            placeholder="john.doe@example.com"
            type="email"
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
              textAlign: "start",
            }}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
            placeholder="Enter your password"
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
              textAlign: "start",
            }}
          />

          <div className="flex items-center justify-end">
            <Link to="/forgot-password" className="text-blue-500">
              Forgot password?
            </Link>
          </div>
          <Button
            disabled={loginLoading}
            loading={loginLoading}
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10 }}
          >
            Continue with Email
          </Button>
        </FormWrapper>

        <Divider>Or Login with</Divider>
        <div className="grid grid-cols-3 h-16 gap-2 space-x-4">
          <button className="px-6 flex items-center justify-center  py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <AppleOutlined className="text-2xl" />
          </button>
          <button className="px-6 flex items-center justify-center  py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <GoogleOutlined className="text-2xl" />
          </button>
          <button className="px-6 flex items-center justify-center  py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <TiSocialFacebook className="text-2xl" />
          </button>
        </div>

        <div className="mt-4 text-gray-500">
          New to Sampli?{" "}
          <Link
            to="/choose-role"
            className="text-blue-500 hover:underline transtion-all"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
