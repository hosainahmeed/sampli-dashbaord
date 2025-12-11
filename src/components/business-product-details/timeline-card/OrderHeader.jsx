import { Col, Image, Row, Space, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
const { Title, Text } = Typography
function OrderHeader({ order, shippingStatus }) {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        if (!order?.product?.images?.length) return;
        const interval = setInterval(() => {
            setCurrentImgIndex(
                (prevIndex) => (prevIndex + 1) % order.product.images.length
            );
        }, 2000);

        return () => clearInterval(interval);
    }, [order?.product?.images]);
    return (
        <div className="order-header">
            <Row gutter={16} align="middle">
                <Col flex="none">
                    <Image
                        width={80}
                        height={80}
                        src={order?.product?.images?.[currentImgIndex] || ""}
                        alt={order?.product?.name}
                        preview={false}
                        style={{ borderRadius: 8, objectFit: "cover" }}
                    />
                </Col>
                <Col flex="auto" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <Title level={4} style={{ margin: 0 }}>
                        {order?.product?.name}
                    </Title>
                    <Text type="secondary">
                        Campaign: {order?.campaign?.name}
                    </Text>
                    {shippingStatus && (
                        <Space size={4} style={{ marginTop: 4 }}>
                            <Tag color={shippingStatus.color} style={{ margin: 0 }}>
                                {shippingStatus.status}
                            </Tag>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {shippingStatus.description}
                            </Text>
                        </Space>
                    )}
                </Col>
                <Col flex="none">
                    <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
                        ${order?.amount}
                    </Title>
                </Col>
            </Row>
        </div>
    )
}

export default OrderHeader