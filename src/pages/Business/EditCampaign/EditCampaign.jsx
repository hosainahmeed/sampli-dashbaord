import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  useGetCampaignByIdQuery,
  useUpdateCampaignMutation,
} from "../../../Redux/businessApis/campaign/campaignApis";
import toast from "react-hot-toast";

const { Option } = Select;

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Both', value: 'both' },
  { label: 'Other', value: 'other' },
];

function EditCampaign() {
  const { id } = useLocation().state;
  const { data: campaignData, isLoading } = useGetCampaignByIdQuery(id, {
    skip: !id,
  });
  const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Prefill form when data loads
  useEffect(() => {
    if (campaignData?.data) {
      const d = campaignData.data;
      form.setFieldsValue({
        name: d.name,
        minAge: d.minAge,
        maxAge: d.maxAge,
        startDate: d.startDate ? dayjs(d.startDate) : null,
        endDate: d.endDate ? dayjs(d.endDate) : null,
        gender: d.gender,
        location: d.location,
      });
    }
  }, [campaignData, form]);

  const onFinish = async (values) => {
    const payload = {
      ...values,
      startDate: values.startDate?.toISOString(),
      endDate: values.endDate?.toISOString(),
    };
    try {
      await updateCampaign({ id, data: payload }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          navigate('/campaign');
        }
      });
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'Something went wrong');
    }
  };

  if (isLoading) return <div className="container mx-auto">
    <Card loading />
  </div>;

  return (
    <div className="max-w-screen-md mx-auto mt-8">
      <Form
        layout="vertical"
        form={form} r
        requiredMark={false}
        onFinish={onFinish}
        className="space-y-4"
      >
        <Form.Item
          label="Campaign Name"
          name="name"
          rules={[{ required: true, message: "Please enter campaign name" }]}
        >
          <Input placeholder="Campaign name" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Min Age"
            name="minAge"
            rules={[{ required: true, message: "Enter min age" }]}
          >
            <Input type="number" placeholder="18" />
          </Form.Item>

          <Form.Item
            label="Max Age"
            name="maxAge"
            rules={[{ required: true, message: "Enter max age" }]}
          >
            <Input type="number" placeholder="45" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Select start date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Select end date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </div>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Select gender" }]}
        >
          <Select placeholder="Select gender">
            {genderOptions.map((g) => (
              <Option key={g.value} value={g.value}>
                {g.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input placeholder="New York, USA" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isUpdating}
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default EditCampaign;
