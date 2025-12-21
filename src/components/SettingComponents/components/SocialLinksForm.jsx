import React, { useEffect } from 'react';
import { Form, Input, Row, Col, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useUpdateProfileMutation } from '../../../Redux/businessApis/business _profile/getprofileApi';

const { Text } = Typography;

const SocialLinksForm = ({ data }) => {
    const [form] = Form.useForm();
    const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);

    const handleSubmit = async (values) => {
        try {
            await updateProfile(values).unwrap().then((res) => {
                if (res?.success) {
                    toast.success(res?.message)
                }
            })
        } catch (error) {
            toast.error(error?.data?.message)
        }
    };
    const platforms = ['facebook', 'twiter', 'tiktok', 'instagram', 'website', 'linkedin'];

    return (
        <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>Social Links</h3>
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                Connect with your audience across platforms
            </Text>

            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Row gutter={16}>
                    {platforms.map((platform) => (
                        <Col span={12} key={platform}>
                            <Form.Item
                                name={platform}
                                label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                            >
                                <Input size='large' placeholder={`Enter your ${platform} URL`} />
                            </Form.Item>
                        </Col>
                    ))}
                </Row>
                <Button loading={updateProfileLoading} size='large' htmlType="submit" type="primary" icon={<UploadOutlined />}>
                    Save Social Links
                </Button>
            </Form>
        </div>
    );
};

export default SocialLinksForm;
