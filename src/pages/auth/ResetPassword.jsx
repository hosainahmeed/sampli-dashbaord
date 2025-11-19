import React from "react";
import { Button, Typography } from "antd";
import "antd/dist/reset.css";
import Logo from "../../components/ui/Logo";
import InputField from "../../components/ui/InputField";
import FormWrapper from "../../components/ui/FormWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useAuthResetPasswordMutation } from "../../Redux/authApis";
import toast from "react-hot-toast";

const { Title } = Typography;

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [resetPassword, { isLoading: resetPasswordLoading }] = useAuthResetPasswordMutation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        return Promise.reject(new Error("Passwords do not match!"));
      }
      const email = localStorage.getItem("email");
      if (!email) {
        throw new Error("Email not found!");
      }
      const data = {
        email: email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }
      await resetPassword(data).unwrap().then((response) => {
        if (response?.success) {
          localStorage.setItem("token", response?.data?.accessToken);
          toast.success(response?.message || "Password reset successfully!");
          navigate("/");
        } else {
          throw new Error(response?.message || "Something went wrong!");
        }
      })
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 gradient-container">
      <div className="gradient-ellipse "></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={4} className="mb-1">
            Create new password
          </Title>
          <h1 className="text-[var(--body-text)]">
            To secure your account, please create a new password.
          </h1>
        </div>

        <FormWrapper onFinish={onFinish}>
          <InputField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
            placeholder="Password"
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
              textAlign: "start",
            }}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
            placeholder="Confirm Password"
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
              textAlign: "start",
            }}
          />

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10 }}
            loading={resetPasswordLoading}
          >
            Confirm
          </Button>
        </FormWrapper>
        <div className="mt-3 text-gray-500">
          <Link to="/login" className="mr-3 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

