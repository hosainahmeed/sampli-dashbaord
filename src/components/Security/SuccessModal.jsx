import React from "react";
import { Modal, Typography } from "antd";
import successLogo from "../../assets/logo/success.svg";

const { Title, Text } = Typography;

const SuccessModal = ({ open, onCancel, title, description }) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} centered>
      <div className="flex flex-col items-center text-center gap-4">
        <img className="w-24 h-24 object-cover" src={successLogo} alt="Success" />
        <Title level={3}>{title}</Title>
        <Text>{description}</Text>
      </div>
    </Modal>
  );
};

export default SuccessModal;
