import React from "react";
import { Button, Typography } from "antd";
import "antd/dist/reset.css";
import Logo from "../../components/ui/Logo";
import InputField from "../../components/ui/InputField";
import FormWrapper from "../../components/ui/FormWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useAuthForgetPasswordMutation } from "../../Redux/authApis";
import toast from "react-hot-toast";
const { Title } = Typography;

const ForgetPassword = () => {
  const [forgetPassword, { isLoading: forgetPasswordLoading }] = useAuthForgetPasswordMutation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      await forgetPassword(values).unwrap().then((response) => {
        if (response?.success) {
          localStorage.setItem("email", values?.email);
          toast.success(response?.message || "Otp sent successfully!");
          navigate("/otp");
        } else {
          throw new Error(response?.message || "Something went wrong!");
        }
      })
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
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
            placeholder="john@example.com"
            type="email"
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
              textAlign: "start",
            }}
          />
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10, marginBottom: 10 }}
            loading={forgetPasswordLoading}
          >
            Continue
          </Button>
        </FormWrapper>
        <Link to="/login" className="text-blue-500 hover:underline">Return to Login</Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
