import React from "react";
import {
    EnvironmentOutlined,
    CheckCircleFilled,
    ClockCircleOutlined,
    CloseCircleFilled,
    ExclamationCircleFilled,
} from "@ant-design/icons";


export const SHIPPO_STATUS_CONFIG = {
    UNKNOWN: {
        title: "Order Processed",
        description: "Electronic shipment information received",
        icon: <ClockCircleOutlined />,
        color: "#1890ff",
        timelineOrder: 1,
    },
    PRE_TRANSIT: {
        title: "Pre-Transit",
        description: "Package is being prepared for shipment",
        icon: <ClockCircleOutlined />,
        color: "#1890ff",
        timelineOrder: 2,
    },
    TRANSIT: {
        title: "In Transit",
        description: "Package is on its way to destination",
        icon: <EnvironmentOutlined />,
        color: "#faad14",
        timelineOrder: 3,
    },
    OUT_FOR_DELIVERY: {
        title: "Out for Delivery",
        description: "Package is out for delivery today",
        icon: <EnvironmentOutlined />,
        color: "#52c41a",
        timelineOrder: 4,
    },
    DELIVERED: {
        title: "Delivered",
        description: "Package has been delivered",
        icon: <CheckCircleFilled />,
        color: "#52c41a",
        timelineOrder: 5,
    },
    RETURNED: {
        title: "Returned",
        description: "Package was returned to sender",
        icon: <CloseCircleFilled />,
        color: "#ff4d4f",
        timelineOrder: 6,
    },
    FAILURE: {
        title: "Delivery Failed",
        description: "Unable to deliver the package",
        icon: <ExclamationCircleFilled />,
        color: "#ff4d4f",
        timelineOrder: 7,
    },
};