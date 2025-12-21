import { Form, Upload, Input, Rate, Button, Typography } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useCreateReviewMutation } from '../../../../../../Redux/sampler/videoUploadApis';

const { TextArea } = Input;
const { Title, Text } = Typography;

function ImageReview({ campaignId }) {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const formData = new FormData();
  const [createReview,{isLoading}] = useCreateReviewMutation()

  const onFinish = async (values) => {
    if (!campaignId) {
      return toast.error("Campaign ID is required");
    }
    try {
      if (!values.description || !values.rating) {
        throw new Error("Please provide a description and rating");
      }

      const data = {
        campaignOfferId: campaignId,
        description: values.description,
        rating: values.rating,
      }
      formData.append('data', JSON.stringify(data));

      Array.isArray(values?.review_image) && values?.review_image.forEach((image) => {
        formData.append('review_image', image.originFileObj);
      })

      const response = await createReview(formData).unwrap();
      if (!response?.success) {
        throw new Error(response?.message || 'Failed to submit review')
      }
      toast.success(response?.message || "Review submitted successfully!");
      form.resetFields();
      // Handle form submission here
    } catch (error) {
      const message = error?.data?.message || error?.message || 'Something went wrong!'
      toast.error(message)
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 8 }}>
          Your Review Awaits
        </Title>
        <Text type="secondary">
          Your review helps others make informed decisions and improves the product.
          Please share your honest opinion.
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ rating: 0 }}
      >
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: 'Please provide a rating' }]}
        >
          <Rate
            onChange={setRating}
            value={rating}
            style={{ fontSize: 32 }}
          />
        </Form.Item>

        <Form.Item
          label="Tell us more about the product"
          name="description"
          rules={[
            { required: true, message: 'Please describe your experience' },
            { min: 10, message: 'Please provide at least 10 characters' }
          ]}
        >
          <TextArea
            rows={6}
            placeholder="Share your experience with this product. What did you like or dislike?"
            showCount
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item
          label="Upload Images (Optional)"
          name="review_image"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            multiple
            showUploadList={{
              showPreviewIcon: false,
              showRemoveIcon: true,
            }}
            maxCount={6}
            beforeUpload={() => false}
          >
            {form.getFieldValue('images')?.length >= 6 ? null : (
              <div>
                <UploadOutlined style={{ fontSize: 24 }} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="primary"
            htmlType="submit"
            size="large"
            block
          >
            Submit Review
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ImageReview;