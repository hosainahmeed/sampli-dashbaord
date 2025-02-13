import React, { useState } from "react";
import { Button, Card, Divider, Typography } from "antd";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EmailChangeModal from "../Security/EmailChangeModal";
import PasswordChangeModal from "../Security/PasswordChangeModal";
import SuccessModal from "../Security/SuccessModal";
import OtpModal from "../Security/OtpModal";
import ChangePasswordModal from "../Security/ChangePasswordModal";
import PasswordChangeEmailModal from "../Security/PasswordChangeEmailModal";
import PasswordChangeOptModal from "../Security/PasswordChangeOptModal";
import AccountAuthorization from "./AccountAuthorization";

const { Title, Text } = Typography;

function Security() {
  const [modalState, setModalState] = useState({
    emailModal: false,
    passwordModal: false,
    newEmailModal: false,
    otpModal: false,
    successModal: false,
    passwordEmail: false,
    passwordEmailOtp: false,
    changePassModal: false,
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const router = useNavigate();

  const handleResend = () => {
    console.log("Resending OTP...");
    // Add your OTP resend logic here
  };

  const handleContinue = () => {
    console.log("OTP:", otp.join(""));
    setModalState({ ...modalState, otpModal: false, successModal: true });
  };
  const handleContinuePassOtp = () => {
    console.log("OTP:", otp.join(""));
    setModalState({
      ...modalState,
      passwordEmailOtp: false,
      changePassModal: true,
    });
  };

  return (
    <div>
      <Title level={2}>Security</Title>
      <Card>
        <Title level={3}>General</Title>
        <div className="flex-center-between">
          <div>
            <Title level={4}>Email address</Title>
            <Text type="secondary">MichealScott@gmail.com</Text>
          </div>
          <Button
            onClick={() => setModalState({ ...modalState, emailModal: true })}
            shape="circle"
          >
            <FaAngleRight />
          </Button>
        </div>
        <Divider></Divider>
        <div className="flex-center-between mt-3">
          <div>
            <Title level={4}>Password</Title>
            <Text>Change your password</Text>
          </div>
          <Button
            onClick={() =>
              setModalState({ ...modalState, passwordEmail: true })
            }
            shape="circle"
          >
            <FaAngleRight />
          </Button>
        </div>
      </Card>
      <AccountAuthorization />
      <EmailChangeModal
        visible={modalState.emailModal}
        onCancel={() => setModalState({ ...modalState, emailModal: false })}
        onContinue={() =>
          setModalState({
            ...modalState,
            emailModal: false,
            passwordModal: true,
          })
        }
      />

      <PasswordChangeModal
        visible={modalState.passwordModal}
        onCancel={() => setModalState({ ...modalState, passwordModal: false })}
        onContinue={() =>
          setModalState({
            ...modalState,
            passwordModal: false,
            newEmailModal: true,
          })
        }
      />

      <EmailChangeModal
        visible={modalState.newEmailModal}
        onCancel={() => setModalState({ ...modalState, newEmailModal: false })}
        onContinue={() =>
          setModalState({ ...modalState, newEmailModal: false, otpModal: true })
        }
      />

      <OtpModal
        visible={modalState.otpModal}
        onCancel={() => setModalState({ ...modalState, otpModal: false })}
        onContinue={handleContinue}
        onResend={handleResend}
        otp={otp}
        setOtp={setOtp}
      />

      <SuccessModal
        visible={modalState.successModal}
        onCancel={() => setModalState({ ...modalState, successModal: false })}
      />
      {/* password chnages modals */}
      <PasswordChangeEmailModal
        visible={modalState.passwordEmail}
        onCancel={() => setModalState({ ...modalState, passwordEmail: false })}
        onContinue={() =>
          setModalState({
            ...modalState,
            passwordEmail: false,
            passwordEmailOtp: true,
            // changePassModal: true,
          })
        }
      />
      <PasswordChangeOptModal
        visible={modalState.passwordEmailOtp}
        onCancel={() =>
          setModalState({ ...modalState, passwordEmailOtp: false })
        }
        onContinue={handleContinuePassOtp}
        onResend={handleResend}
        otp={otp}
        setOtp={setOtp}
      />
      <ChangePasswordModal
        visible={modalState.changePassModal}
        onCancel={() =>
          setModalState({ ...modalState, changePassModal: false })
        }
        onOk={async (values) => {
          try {
            console.log(values);

            if (response.status === 200) {
              setModalState({
                ...modalState,
                changePassModal: false,
                successModal: true,
              });
            }
          } catch (error) {
            console.log("Error changing password:", error);
          }
        }}
      />
    </div>
  );
}

export default Security;
