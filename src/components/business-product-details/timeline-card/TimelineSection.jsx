import { Card, Col, Divider, Row, Space, Tag, Timeline, Typography } from 'antd'
import React from 'react'
import {
    ClockCircleOutlined,
    EnvironmentOutlined
} from "@ant-design/icons";
const { Title, Text } = Typography
function TimelineSection({ order, shippoTimelineData, trackData }) {

    const getTimelineItems = () => {
        // If we have Shippo tracking data, use that
        if (shippoTimelineData) {
            return shippoTimelineData.map((item, index) => {
                const isLast = index === shippoTimelineData.length - 1;

                return {
                    color: item.color,
                    dot: item.icon,
                    children: (
                        <div style={{ paddingBottom: 16 }}>
                            <div
                                style={{
                                    color: "#262626",
                                    fontWeight: isLast ? 600 : 500,
                                    fontSize: 14,
                                    marginBottom: 4,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                {item.title}
                                {item.isCurrent && (
                                    <Tag color="processing" style={{ fontSize: 11, padding: "0 6px" }}>
                                        CURRENT
                                    </Tag>
                                )}
                            </div>
                            <div
                                style={{
                                    color: "#595959",
                                    fontSize: 13,
                                    marginBottom: 4,
                                }}
                            >
                                {item.description}
                            </div>
                            {item.location && (
                                <div
                                    style={{
                                        color: "#8c8c8c",
                                        fontSize: 12,
                                        marginBottom: 4,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                    }}
                                >
                                    <EnvironmentOutlined style={{ fontSize: 11 }} />
                                    {item.location}
                                </div>
                            )}
                            <div
                                style={{
                                    color: "#8c8c8c",
                                    fontSize: 11,
                                    fontWeight: 500,
                                }}
                            >
                                {item.date}
                            </div>
                        </div>
                    ),
                };
            });
        }

        // Fallback to regular order timeline
        if (order?.status === "Cancelled") {
            return BASE_TIMELINE.map((step, index) => {
                const isCancelledStep = step.status === order.cancelStage;

                return {
                    color: isCancelledStep ? "#ff4d4f" : "#d9d9d9",
                    dot: isCancelledStep ? <CloseCircleFilled style={{ color: "#ff4d4f" }} /> : null,
                    children: (
                        <div style={{ paddingBottom: 16 }}>
                            <div
                                style={{
                                    color: isCancelledStep ? "#ff4d4f" : "#8c8c8c",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    marginBottom: 4,
                                }}
                            >
                                {step.label}
                            </div>
                            <div
                                style={{
                                    color: "#8c8c8c",
                                    fontSize: 12,
                                }}
                            >
                                {order?.history?.[step.status]
                                    ? new Date(order.history[step.status]).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "Pending"}
                            </div>
                            {isCancelledStep && (
                                <Tag color="error" style={{ marginTop: 4 }}>
                                    Cancelled
                                </Tag>
                            )}
                        </div>
                    ),
                };
            });
        }

        // Regular order timeline
        const steps = [...BASE_TIMELINE];
        const currentStep = steps.findIndex(
            (step) => step.status === order?.status?.toLowerCase()
        );

        return steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            let color = "#d9d9d9";
            let dot = null;

            if (isCompleted) {
                color = "#52c41a";
                dot = <CheckCircleFilled style={{ color: "#52c41a" }} />;
            } else if (isCurrent) {
                color = "#1890ff";
                dot = <ClockCircleOutlined style={{ color: "#1890ff" }} />;
            }

            return {
                color,
                dot,
                children: (
                    <div style={{ paddingBottom: 16 }}>
                        <div
                            style={{
                                color: isCompleted ? "#52c41a" : isCurrent ? "#1890ff" : "#8c8c8c",
                                fontWeight: 500,
                                fontSize: 14,
                                marginBottom: 4,
                            }}
                        >
                            {step.label}
                        </div>
                        <div
                            style={{
                                color: "#8c8c8c",
                                fontSize: 12,
                            }}
                        >
                            {order?.history?.[step.status]
                                ? new Date(order.history[step.status]).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })
                                : "Pending"}
                        </div>
                    </div>
                ),
            };
        });
    };

    return (
        <div>
            {(order?.status !== "Accepted" || shippoTimelineData) && (
                <>
                    <Divider orientation="left">
                        <Title level={5} style={{ margin: 0 }}>
                            {shippoTimelineData ? "Shipping Timeline" : "Order Timeline"}
                        </Title>
                    </Divider>
                    <div style={{ padding: "16px 0" }}>
                        {shippoTimelineData?.length > 0 ? (
                            <Timeline
                                items={getTimelineItems()}
                                style={{
                                    paddingLeft: 8,
                                }}
                            />
                        ) : (
                            <Timeline
                                items={getTimelineItems()}
                                style={{
                                    paddingLeft: 8,
                                }}
                            />
                        )}
                    </div>

                    {/* ETA Information for Shippo */}
                    {trackData?.data?.trackingData?.eta && (
                        <Card
                            size="small"
                            style={{
                                marginTop: 16,
                                backgroundColor: "#f6ffed",
                                borderColor: "#b7eb8f",
                            }}
                        >
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <Space direction="vertical" size={2}>
                                        <Text strong>Estimated Delivery</Text>
                                        <Text type="secondary">
                                            {new Date(trackData?.data?.trackingData?.eta).toLocaleDateString(
                                                "en-US",
                                                {
                                                    weekday: "long",
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                }
                                            )}
                                        </Text>
                                    </Space>
                                </Col>
                                <Col>
                                    <ClockCircleOutlined style={{ color: "#52c41a", fontSize: 20 }} />
                                </Col>
                            </Row>
                        </Card>
                    )}
                </>
            )}
        </div>
    )
}

export default TimelineSection