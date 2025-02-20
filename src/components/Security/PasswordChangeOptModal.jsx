import React, { useState, useEffect, useRef } from "react";
import { Modal, Input, Button, Typography } from "antd";

const { Title, Text } = Typography;

const PasswordChangeOptModal = ({
  visible,
  onCancel,
  onContinue,
  onResend,
  otp,
  setOtp,
}) => {
  const [timeLeft, setTimeLeft] = useState(30); // Timer state
  const inputsRef = useRef([]);

  // Timer logic
  useEffect(() => {
    if (visible && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [visible, timeLeft]);

  // Reset timer when modal is opened
  useEffect(() => {
    if (visible) {
      setTimeLeft(30); // Reset timer to 30 seconds
    }
  }, [visible]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResendClick = () => {
    setOtp(["", "", "", "", "", ""]); // Reset OTP input
    setTimeLeft(30); // Reset timer
    onResend(); // Trigger resend logic
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="text-center"
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg text-center">
        <div className="flex items-start flex-col text-start">
          <Title level={1} className="mb-2">
            Change Email address
          </Title>
          <h1 className="text-base font-extralight text-[var(--body-text)]">
            We sent a 6-digit OTP to{" "}
            <strong className="text-[#111]">micheal@gmail.com</strong>. Please
            input it below.
          </h1>
        </div>

        <div className="flex justify-center gap-2 my-4">
          {otp.map((value, index) => (
            <Input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="text-center text-xl w-12 h-12 border-2 border-blue-400"
            />
          ))}
        </div>

        <Button
          type="primary"
          className="w-full"
          disabled={otp.includes("")}
          onClick={onContinue}
        >
          Continue
        </Button>

        <div className="mt-3">
          {timeLeft > 0 ? (
            <Text>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</Text>
          ) : (
            <h1
              className="text-blue-500 cursor-pointer"
              onClick={handleResendClick}
            >
              Resend OTP
            </h1>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PasswordChangeOptModal;
