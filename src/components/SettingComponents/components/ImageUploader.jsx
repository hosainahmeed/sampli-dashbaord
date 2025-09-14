import React from 'react';
import { Button, Space, Tooltip, Typography, Upload } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { RiImageAddLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { IMAGE_REQUIREMENTS, ACCEPTED_FILE_TYPES } from '../config';

const { Text } = Typography;
const { Dragger } = Upload;

const ImageUploader = ({ type, image, warning, onUpload, onRemove }) => {
    const { title, description, minWidth, minHeight } = IMAGE_REQUIREMENTS[type];

    const handleBeforeUpload = (file) => {
        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
            toast.error('Please upload HEIC, WEBP, SVG, PNG, or JPG files only.');
            return false;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.error('File size should be less than 10MB');
            return false;
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            const warn =
                img.width < minWidth || img.height < minHeight
                    ? `Warning: ${title} is smaller than ${minWidth}×${minHeight}px`
                    : null;

            const formData = new FormData();
            formData.append(type, file);

            onUpload({
                file,
                preview: objectUrl,
                warning: warn,
                formData,
            });
        };

        img.src = objectUrl;
        return false;
    };

    return (
        <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                {description}
            </Text>

            <div className="border border-gray-300 rounded-lg p-4">
                {image ? (
                    <div className="flex items-center justify-center flex-col">
                        <div className="w-full h-40 flex items-center justify-center overflow-hidden border border-gray-300 rounded-md bg-gray-50">
                            <img
                                src={image.preview}
                                alt={title}
                                className="max-h-full object-contain"
                            />
                        </div>

                        <div className="mt-6 flex flex-col items-center">
                            <Space size={16}>
                                <Tooltip title="Edit">
                                    <Button
                                        shape='circle'
                                        icon={<EditOutlined />}
                                        onClick={() => document.getElementById(`${type}-upload`).click()}
                                    />
                                </Tooltip>
                                <Tooltip title="Remove">
                                    <Button
                                        shape='circle'
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => onRemove(type)}
                                    />
                                </Tooltip>
                            </Space>
                            {warning && <Text type="warning">{warning}</Text>}
                        </div>
                    </div>

                ) : (
                    <Dragger
                        showUploadList={false}
                        beforeUpload={handleBeforeUpload}
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
                            HEIC, WEBP, SVG, PNG, or JPG <br />
                            Recommended: {minWidth}×{minHeight}px
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
                            handleBeforeUpload(e.target.files[0]);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ImageUploader;
