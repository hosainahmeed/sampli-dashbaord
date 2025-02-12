import React from "react";
import { Form, Button, Typography } from "antd";
import "antd/dist/reset.css";
import Logo from "../../components/ui/Logo";
import InputField from "../../components/ui/InputField";
import FormWrapper from "../../components/ui/FormWrapper";
import { Link } from "react-router-dom";

const { Title } = Typography;

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      return Promise.reject(new Error("Passwords do not match!"));
    }
    console.log("Success:", values);
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
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
          >
            Confirm
          </Button>
        </FormWrapper>
        <div className="mt-12 text-gray-500">
          <Link to="/help" className="mr-3">
            Help
          </Link>
          <Link to="/privacy" className="mr-3">
            Privacy
          </Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

