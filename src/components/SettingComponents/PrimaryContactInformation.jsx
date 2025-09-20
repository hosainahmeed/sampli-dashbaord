import { Button, Card, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useUpdateProfileMutation } from "../../Redux/businessApis/business _profile/getprofileApi";
import toast from "react-hot-toast";

function PrimaryContactInformation({ data }) {
  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      bio: data?.bio,
    })
  }, [data])
  const onFinishForm = async (values) => {
    try {
      await updateProfile(values).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.data?.message || res?.message || "Profile updated successfully");
        }
      })
    } catch (error) {

    }
  };
  return (
    <div>
      <Card className="w-full flex-1">
        <Form
          requiredMark={false}
          layout="vertical"
          onFinish={onFinishForm}
          form={form}
        >
          <Form.Item
            label="Bio"
            name="bio"
          >
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button loading={updateProfileLoading} disabled={updateProfileLoading} type="primary" htmlType="submit" className="bg-gray-300">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default PrimaryContactInformation;
