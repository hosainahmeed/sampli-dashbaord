import React from "react";
import { Modal, Typography } from "antd";
import successLogo from "../../assets/logo/success.svg";
const { Title, Text } = Typography;

const SuccessModal = ({ visible, onCancel }) => {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="text-center !flex !items-center !justify-center !gap-2 !flex-col"
    >
      <div className="flex items-center justify-center w-full">
        <img
          className="w-24 h-24 object-cover"
          src={successLogo}
          alt="Success"
        />
      </div>
      <Title level={3}>Email Updated Successfully!</Title>
      <Text>
        Your email address has been changed successfully. You'll use this new
        email the next time you sign in.
      </Text>
      <div className="p-4 mt-3 rounded-2xl bg-[#ecf2ff] text-blue-500">
        A confirmation has been sent to your new email address. Please check
        your inbox to verify the change.
      </div>
    </Modal>
  );
};

export default SuccessModal;
