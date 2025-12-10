import React from 'react'
import { Card, Col, Divider, Row, Typography } from 'antd'
const { Title, Text } = Typography
function ShippingInformation({ trackData }) {
    return (
        <div>
            {trackData?.data?.trackingData && (
                <>
                    <Divider orientation="left">
                        <Title level={5} style={{ margin: 0 }}>
                            Shipping Information
                        </Title>
                    </Divider>
                    <Row gutter={16} style={{ marginBottom: 24 }}>
                        <Col span={12}>
                            <Card size="small" title="From" style={{ height: "100%" }}>
                                <Text strong>{trackData?.data?.trackingData?.address_from.city}</Text>
                                <br />
                                <Text type="secondary">
                                    {trackData?.data?.trackingData?.address_from.state},{" "}
                                    {trackData?.data?.trackingData?.address_from.zip}
                                </Text>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size="small" title="To" style={{ height: "100%" }}>
                                <Text strong>{trackData?.data?.trackingData?.address_to.city}</Text>
                                <br />
                                <Text type="secondary">
                                    {trackData?.data?.trackingData?.address_to.state},{" "}
                                    {trackData?.data?.trackingData?.address_to.zip}
                                </Text>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: 24 }}>
                        {/* <Col span={12}>
                            <Card size="small" title="Tracking Number">
                                <Text copyable>{trackData?.data?.trackingData?.tracking_number}</Text>
                            </Card>
                        </Col> */}
                        <Col span={24}>
                            <Card size="small" title="Carrier">
                                <Text strong>{trackData?.data?.trackingData?.carrier.toUpperCase()}</Text>
                                <br />
                                <Text type="secondary">
                                    {trackData?.data?.trackingData?.servicelevel.name}
                                </Text>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    )
}

export default ShippingInformation