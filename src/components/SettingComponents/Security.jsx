import React, { useState } from 'react';
import { Button, Card, Divider, Typography } from 'antd';
import { FaAngleRight } from 'react-icons/fa';
import SuccessModal from '../Security/SuccessModal';
import ChangePasswordModal from '../Security/ChangePasswordModal';
import AccountAuthorization from './AccountAuthorization';
import DeleteAccountCard from '../Security/DeleteAccountCard';
import { useUpdatePasswordMutation } from '../../Redux/authApis';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;

function Security() {
  const [modalState, setModalState] = useState({
    success: false,
    changePass: false,
  });
  
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const handlePasswordUpdate = async (values) => {
    try {
      const res = await updatePassword({ data: values }).unwrap();

      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message || "Password updated successfully!");
        setModalState({ changePass: false, success: true });
        localStorage.removeItem("token");
      }else{
        throw new Error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      if (error?.data?.fieldErrors) {
        return error.data.fieldErrors;
      }
      toast.error(error?.data?.message || error?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <Title level={3}>Security</Title>
      <Card className="!mb-4">
        <div className="flex-center-between mt-3">
          <div>
            <Title level={4}>Password</Title>
            <Text>Change your password</Text>
          </div>
          <Button
            onClick={() => setModalState((p) => ({ ...p, changePass: true }))}
            shape="circle"
          >
            <FaAngleRight />
          </Button>
        </div>
      </Card>

      {/* Other Components */}
      {/* <AccountAuthorization /> */}
      {/* <div className="!mt-4">
        <DeleteAccountCard />
      </div> */}

      {/* Modals */}
      <ChangePasswordModal
        open={modalState.changePass}
        onCancel={() => setModalState((p) => ({ ...p, changePass: false }))}
        onSubmit={handlePasswordUpdate}
        loading={isLoading}
      />

      <SuccessModal
        open={modalState.success}
        onCancel={() => setModalState((p) => ({ ...p, success: false }))}
        title="Password Updated Successfully!"
        description="Your password has been changed successfully. Use your new password next time you sign in."
      />
    </div>
  );
}

export default Security;
