import { Button, Card, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";

function PrimaryContactInformation({ data }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      bio: data?.bio,
    })
  }, [data])
  const onFinishForm = (values) => {
    console.log(values);
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
            rules={[
              { required: true, message: "Please enter your bio!" },
            ]}
          >
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" className="bg-gray-300">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default PrimaryContactInformation;
