import { Button, Card, Form } from "antd";
import React from "react";
import FormWrapper from "../ui/FormWrapper";
import InputField from "../ui/InputField";

function PrimaryContactInformation() {
  const onFinishForm = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Card className="w-full shadow-md flex-1">
        <FormWrapper
          onFinish={onFinishForm}
          className="grid grid-cols-1 gap-x-4 gap-y-4"
        >
          <InputField
            label="Contact Name"
            name="contactName"
            rules={[
              { required: true, message: "Please enter your contact name!" },
            ]}
            placeholder="Enter contact name"
          />
          <InputField
            label="Contact Role"
            name="contactRole"
            placeholder="Enter contact role"
            rules={[
              { required: true, message: "Please enter your contact role!" },
            ]}
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter phone number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          />
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" className="bg-gray-300">
              Save
            </Button>
          </Form.Item>
        </FormWrapper>
      </Card>
    </div>
  );
}

export default PrimaryContactInformation;
