import React, { useState, useEffect } from "react";
import { Typography, Input, Button, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { useAuthVerifyResetOtpMutation } from "../../Redux/authApis";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

const OTPVerification = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);
  const [verifyOtp, { isLoading: verifyOtpLoading }] = useAuthVerifyResetOtpMutation();
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(30);
  };

  const email = localStorage.getItem("email")
  const handleContinue = async (values) => {
    try {
      if (!email) {
        throw new Error("Email not found!");
      }
      const data = {
        email: email,
        resetCode: parseInt(values?.verifyCode),
      };
      await verifyOtp(data).unwrap().then((response) => {
        if (response?.success) {
          toast.success(response?.message || "Otp sent successfully!");
          navigate("/reset-password");
        } else {
          throw new Error(response?.message || "Something went wrong!");
        }
      })
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 gradient-container">
      <div className="gradient-ellipse "></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex items-start flex-col text-start">
          <Title level={1} className="mb-2">
            Reset Password
          </Title>
          <h1 className="text-base font-extralight text-[var(--body-text)]">
            We sent a 6-digit One Time Password to{" "}
            <strong className="text-[#111]">{email ?? "example@gmail.com"}</strong>. Please
            input it below.
          </h1>
        </div>

        <Form onFinish={handleContinue}>
          <Form.Item className="!w-full !flex !justify-center" name={"verifyCode"} rules={[{ required: true }]}>
            <Input.OTP
              className="!w-[70px] !h-[50px] !mt-[10px]"
              variant="outlined"
              length={5}
              size="middle"
            />
          </Form.Item>
          <Form.Item>
            <Button
              // loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full !mt-[10px]"
              size="large"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-3">
          {timeLeft > 0 ? (
            <Text>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</Text>
          ) : (
            <h1 className="text-blue-500 cursor-pointer" onClick={handleResend}>
              Resend One time Password
            </h1>
          )}
        </div>

        {/* <div className="mt-4 text-gray-500">
          <Link to="/help" className="mr-3">
            Help
          </Link>
          <Link to="/privacy" className="mr-3">
            Privacy
          </Link>
          <Link to="/terms">Terms</Link>
        </div> */}
      </div>
    </div>
  );
};

export default OTPVerification;
