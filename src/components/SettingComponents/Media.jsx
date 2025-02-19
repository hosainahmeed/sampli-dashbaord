/* eslint-disable no-undef */
import React, { useState } from "react";
import {
  Upload,
  message,
  Button,
  Typography,
  Input,
  Row,
  Col,
  Form,
  Card,
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { Text } = Typography;

const Media = () => {
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [logoImageUrl, setLogoImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    tiktok: "",
    instagram: "",
    website: "",
    linkedin: "",
  });

  const handleUpload = (file, imageType) => {
    const isValidSize = file.size / 1024 / 1024 < 10;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 1920 || img.height < 1080 || !isValidSize) {
        message.warning(
          "Your cover image is less than 1920×1080 px and may not be used by some apps and channels"
        );
      }
      if (imageType === "cover") {
        setCoverImageUrl(img.src);
      } else {
        setLogoImageUrl(img.src);
      }
      setFile(file);
      console.log("Uploaded File:", file);
    };
    return false;
  };

  const handleRemove = (imageType) => {
    if (imageType === "cover") {
      setCoverImageUrl(null);
    } else {
      setLogoImageUrl(null);
    }
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <h2 className="text-2xl mb-4">Cover Image</h2>
      <p className="text-base mb-4">
        You can showcase promotional banners to grab attention and highlight key
        offers!
      </p>

      {/* Upload Cover Image Section */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {!coverImageUrl ? (
          <Dragger
            beforeUpload={(file) => handleUpload(file, "cover")}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <PlusOutlined style={{ fontSize: 32 }} />
            </p>
            <p className="ant-upload-text">Add Cover Image</p>
            <p className="ant-upload-hint">
              HEIC, WEBP, SVG, PNG, or JPG. Recommended: 1920×1080 pixels
              minimum.
            </p>
          </Dragger>
        ) : (
          <div
            style={{ position: "relative", textAlign: "center", marginTop: 20 }}
          >
            <img
              src={coverImageUrl}
              alt="Cover"
              style={{
                width: "100%",
                maxHeight: 200,
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
            <div style={{ marginTop: 10 }}>
              <Button
                icon={<EditOutlined />}
                onClick={() => setCoverImageUrl(null)}
              >
                Edit
              </Button>
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleRemove("cover")}
                style={{ marginLeft: 10 }}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </div>

      {file && file.size && (file.width < 1920 || file.height < 1080) && (
        <Text type="warning">
          Your cover image is less than 1920×1080 px and may not be used by some
          apps and channels.
        </Text>
      )}

      {/* Logo Section */}
      <div className="mt-6">
        <h3 className="text-xl mb-2">Logo</h3>
        <p>Add your brand logo</p>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          {!logoImageUrl ? (
            <Dragger
              beforeUpload={(file) => handleUpload(file, "logo")}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <PlusOutlined style={{ fontSize: 32 }} />
              </p>
              <p className="ant-upload-text">Add a logo</p>
              <p className="ant-upload-hint">
                HEIC, WEBP, SVG, PNG, or JPG. Recommended: 512×512 pixels
                minimum.
              </p>
            </Dragger>
          ) : (
            <div
              style={{
                position: "relative",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              <img
                src={logoImageUrl}
                alt="Logo"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div style={{ marginTop: 10 }}>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setLogoImageUrl(null)}
                >
                  Edit
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleRemove("logo")}
                  style={{ marginLeft: 10 }}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="mt-6">
        <h3 className="text-xl mb-2">Socials Link</h3>
        <p>Promote your brand by adding your social links</p>

        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Facebook">
                <Input
                  name="facebook"
                  value={socialLinks.facebook}
                  onChange={handleSocialLinkChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Twitter">
                <Input
                  name="twitter"
                  value={socialLinks.twitter}
                  onChange={handleSocialLinkChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tiktok">
                <Input
                  name="tiktok"
                  value={socialLinks.tiktok}
                  onChange={handleSocialLinkChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Instagram">
                <Input
                  name="instagram"
                  value={socialLinks.instagram}
                  onChange={handleSocialLinkChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Website">
                <Input
                  name="website"
                  value={socialLinks.website}
                  onChange={handleSocialLinkChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="LinkedIn">
                <Input
                  name="linkedin"
                  value={socialLinks.linkedin}
                  onChange={handleSocialLinkChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export default Media;
