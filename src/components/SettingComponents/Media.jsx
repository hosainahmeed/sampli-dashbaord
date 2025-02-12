import React, { useState } from "react";
import { Upload, message, Button, Typography } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { Text } = Typography;

const CoverImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleUpload = (file) => {
    const isValidSize = file.size / 1024 / 1024 < 10;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 1920 || img.height < 1080) {
        message.warning(
          "Your cover image is less than 1920×1080 px and may not be used by some apps and channels"
        );
      }
      setImageUrl(img.src);
      setFile(file);
      console.log("Uploaded File:", file);
    };
    return false;
  };

  const handleRemove = () => {
    setImageUrl(null);
    setFile(null);
  };

  return (
    <div>
      <h1 className="text-xl">Cover Image</h1>
      <p className="text-base ">
        You can showcase promotional banners to grab attention and highlight key
        offers!
      </p>

      {!imageUrl ? (
        <Dragger beforeUpload={handleUpload} showUploadList={false}>
          <p className="ant-upload-drag-icon">
            <PlusOutlined style={{ fontSize: 32 }} />
          </p>
          <p className="ant-upload-text">Add Cover Image</p>
          <p className="ant-upload-hint">
            HEIC, WEBP, SVG, PNG, or JPG. Recommended: 1920×1080 pixels minimum.
          </p>
        </Dragger>
      ) : (
        <div
          style={{ position: "relative", textAlign: "center", marginTop: 20 }}
        >
          <img
            src={imageUrl}
            alt="Cover"
            style={{
              width: "100%",
              maxHeight: 200,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
          <div style={{ marginTop: 10 }}>
            <Button icon={<EditOutlined />} onClick={() => setImageUrl(null)}>
              Edit
            </Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={handleRemove}
              style={{ marginLeft: 10 }}
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {file && file.size && (file.width < 1920 || file.height < 1080) && (
        <Text type="warning">
          Your cover image is less than 1920×1080 px and may not be used by some
          apps and channels
        </Text>
      )}
    </div>
  );
};

export default CoverImageUploader;
