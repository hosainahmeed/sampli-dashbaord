import React, { useState } from 'react';
import { Card, Typography, Upload, Button, Form, Input, Row, Col } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { RiImageAddLine } from 'react-icons/ri';
import toast from 'react-hot-toast';

const { Titile, Text } = Typography;
const { Dragger } = Upload;
import './Media.css';

const Media = () => {
  const [images, setImages] = useState({
    cover: null,
    logo: null,
  });

  const [form] = Form.useForm();

  const imageRequirements = {
    cover: {
      minWidth: 1920,
      minHeight: 1080,
      title: 'Cover Image',
      description: 'Showcase promotional banners to grab attention!',
    },
    logo: {
      minWidth: 512,
      minHeight: 512,
      title: 'Logo',
      description: 'Add your brand logo',
    },
  };

  const handleImageUpload = (file, type) => {
    // Validate file type
    const validTypes = [
      'image/heic',
      'image/webp',
      'image/svg+xml',
      'image/png',
      'image/jpeg',
    ];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload HEIC, WEBP, SVG, PNG, or JPG files only.');
      return false;
    }

    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return false;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const requirements = imageRequirements[type];

      // Show warning if image doesn't meet size requirements, but still allow upload
      if (
        img.width < requirements.minWidth ||
        img.height < requirements.minHeight
      ) {
        toast.success(
          `Warning: ${requirements.title} is smaller than the recommended size of ${requirements.minWidth}×${requirements.minHeight} pixels. This might affect quality.`,
          { duration: 5000 }
        );
      }

      setImages((prev) => ({
        ...prev,
        [type]: {
          file,
          preview: objectUrl,
        },
      }));
      toast.success(`${requirements.title} uploaded successfully!`);
    };

    img.src = objectUrl;
    return false;
  };

  const handleRemoveImage = (type) => {
    if (images[type]?.preview) {
      URL.revokeObjectURL(images[type].preview);
    }
    setImages((prev) => ({
      ...prev,
      [type]: null,
    }));
    toast.success(`${imageRequirements[type].title} removed successfully!`);
  };

  const handleSocialLinksSubmit = (values) => {
    console.log('Social Links Submitted:', values);
    toast.success('Social links saved successfully!');
  };

  const renderImageUpload = (type) => {
    const { title, description } = imageRequirements[type];
    const image = images[type];

    return (
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
          {description}
        </Text>

        <div className="border border-gray-300 rounded-lg p-4">
          {image ? (
            <div className="flex items-center justify-center flex-col !w-full">
              <div className={type === 'logo' ? 'logoImage' : 'coverImage'}>
                <img
                  src={image.preview}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6">
                <Button
                  icon={<EditOutlined />}
                  onClick={() =>
                    document.getElementById(`${type}-upload`).click()
                  }
                  style={{ marginRight: 8 }}
                >
                  Change
                </Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveImage(type)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <Dragger
              showUploadList={false}
              beforeUpload={(file) => handleImageUpload(file, type)}
              accept=".heic,.webp,.svg,.png,.jpg,.jpeg"
              style={{ padding: 24 }}
            >
              <p className="ant-upload-drag-icon flex justify-center items-center">
                <RiImageAddLine style={{ fontSize: 48, color: '#40a9ff' }} />
              </p>
              <p className="ant-upload-text">
                Click or drag file to upload {title}
              </p>
              <p className="ant-upload-hint">
                HEIC, WEBP, SVG, PNG, or JPG
                <br />
                Recommended: {imageRequirements[type].minWidth}×
                {imageRequirements[type].minHeight} pixels
              </p>
            </Dragger>
          )}
          <input
            id={`${type}-upload`}
            type="file"
            style={{ display: 'none' }}
            accept=".heic,.webp,.svg,.png,.jpg,.jpeg"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0], type);
              }
            }}
          />
        </div>
      </div>
    );
  };

  const renderSocialLinks = () => (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 18, marginBottom: 8 }}>Social Links</h3>
      <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        Connect with your audience across platforms
      </Text>

      <Form
        form={form}
        onFinish={handleSocialLinksSubmit}
        layout="vertical"
        initialValues={{
          facebook: '',
          twitter: '',
          tiktok: '',
          instagram: '',
          website: '',
          linkedin: '',
        }}
      >
        <Row gutter={16}>
          {[
            'facebook',
            'twitter',
            'tiktok',
            'instagram',
            'website',
            'linkedin',
          ].map((platform) => (
            <Col span={12} key={platform}>
              <Form.Item
                name={platform}
                label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                style={{ marginBottom: 16 }}
              >
                <Input placeholder={`Enter your ${platform} URL`} />
              </Form.Item>
            </Col>
          ))}
        </Row>
        <Button htmlType="submit" type="primary" icon={<UploadOutlined />}>
          Save Social Links
        </Button>
      </Form>
    </div>
  );

  return (
    <Card style={{ margin: '0 auto' }}>
      {renderImageUpload('cover')}
      {renderImageUpload('logo')}
      {renderSocialLinks()}
    </Card>
  );
};

export default Media;
