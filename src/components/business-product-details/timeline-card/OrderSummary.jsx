import { Col, Divider, Row, Typography } from 'antd'
import React from 'react'
const { Title, Text } = Typography
function OrderSummary({ subtotal, shipping }) {
    const total = subtotal + shipping;

    return (
        <div>
            <div className="order-summary-section">
                <Title level={5}>Order Summary</Title>
                <Row justify="space-between" style={{ marginTop: 16 }}>
                    <Col>
                        <Text>Subtotal (1 item)</Text>
                    </Col>
                    <Col>
                        <Text>${subtotal.toFixed(2)}</Text>
                    </Col>
                </Row>
                <Row justify="space-between" style={{ marginTop: 8 }}>
                    <Col>
                        <Text>Shipping</Text>
                    </Col>
                    <Col>
                        <Text>${shipping.toFixed(2)}</Text>
                    </Col>
                </Row>
                <Divider style={{ margin: "12px 0" }} />
                <Row justify="space-between">
                    <Col>
                        <Text strong>Total</Text>
                    </Col>
                    <Col>
                        <Title level={4} style={{ margin: 0 }}>
                            ${total.toFixed(2)}
                        </Title>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default OrderSummary