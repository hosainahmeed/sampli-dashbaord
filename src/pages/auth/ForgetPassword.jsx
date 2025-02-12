import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { AppleOutlined, GoogleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Logo from "../../components/ui/Logo";
import { TiSocialFacebook } from "react-icons/ti";
import InputField from "../../components/ui/InputField";
import FormWrapper from "../../components/ui/FormWrapper";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const ForgetPassword = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={4} className="mb-1">
            Reset password
          </Title>
          <h1 className="text-start font-extralight text-[var(--body-text)]">
            Please enter the email address you used to sign up and we will send
            you an confirmation to help reset your password
          </h1>
        </div>

        <FormWrapper onFinish={onFinish}>
          <InputField
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email address!" },
            ]}
            placeholder="MichealScott@gmail.com"
            type="email"
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
              textAlign: "start",
            }}
          />

          <div className="flex items-center justify-end">
            <Link to="/login" className="text-blue-500">
              Return to login
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10 }}
          >
            Continue
          </Button>
        </FormWrapper>

        <Divider>Or Login with</Divider>
        <div className="flex justify-center gap-2 space-x-4">
          <button className="px-6 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <AppleOutlined />
          </button>
          <button className="px-6 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <GoogleOutlined />
          </button>
          <button className="px-6 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <TiSocialFacebook />
          </button>
        </div>

        <div className="mt-4 text-gray-500">
          New to Sampli?{" "}
          <Link to="/register" className="text-blue-500">
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
