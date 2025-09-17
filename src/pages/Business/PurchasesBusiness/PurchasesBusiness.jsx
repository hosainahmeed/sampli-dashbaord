import React, { useState } from "react";
import { Button, Table, Tabs, Tag } from "antd";
import { useGetCampaignPurchaseQuery } from "../../../Redux/businessApis/campaign/campaignPurchaseApis";
import { Link } from "react-router-dom";

const transformOrders = (orders) => {
    return orders.map((item) => ({
        key: item._id,
        name: item.product?.name,
        image: item.product?.images?.[0],
        date: new Date(item.createdAt).toLocaleDateString(),
        status: item.status,
        statusColor:
            item.status === "Accepted"
                ? "green"
                : item.status === "Cancelled"
                    ? "red"
                    : "orange",
        fullData: item,
    }));
};

const PurchasesBusiness = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isLoading } = useGetCampaignPurchaseQuery({
        page,
        limit: pageSize,
    });

    const orders = data?.data?.result ?? [];
    const meta = data?.data?.meta ?? {};
    const productData = transformOrders(orders);

    const columns = [
        {
            title: "Item name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <div className="flex gap-2 items-center">
                    <img
                        src={record.image}
                        alt={record.name}
                        className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex items-center">
                        <h3 className="text-sm font-medium">{record.name}</h3>
                    </div>
                </div>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <Tag color={record.statusColor}>{status}</Tag>
            ),
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <Link to={`/business/purchases/${record?.key}`} state={{ id: record?.key }}>
                    <Button
                        className="border text-blue-500 border-blue-500 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-100 flex items-center justify-center"
                    >
                        View
                    </Button>
                </Link >
            ),
        },
    ];

    const tableProps = {
        loading: isLoading,
        columns,
        dataSource: productData,
        rowKey: "key",
        pagination: {
            current: meta.page || page,
            pageSize: meta.limit || pageSize,
            total: meta.total || 0,
            onChange: (newPage, newSize) => {
                setPage(newPage);
                setPageSize(newSize);
            },
            showSizeChanger: false,
            position: ["bottomCenter"],
            itemRender: (current, type, originalElement) => {
                if (type === "prev" && current > 1) {
                    return (
                        <button className="!border-none">
                            <span className="text-[#2E78E9]">Previous</span>
                        </button>
                    );
                }
                if (type === "next") {
                    return (
                        <button className="!border-none">
                            <span className="text-[#2E78E9]">Next Page</span>
                        </button>
                    );
                }
                if (type === "page") {
                    return current;
                }
                return originalElement;
            },
        },
        scroll: { x: 1000 },
    };

    // const tabs = [
    //     {
    //         key: "1",
    //         label: "In Progress / Delivered",
    //         children: <Table {...tableProps} />,
    //     },
    //     {
    //         key: "2",
    //         label: "Cancelled / Returned",
    //         children: <Table {...tableProps} />,
    //     },
    // ];

    return (
        <div className="h-[94vh] overflow-auto scrollbar-none p-4">
            <div className="text-xl font-semibold mb-5">Campaign Offer / Offer Shipment</div>
            {/* <Tabs defaultActiveKey="1" items={tabs} /> */}
            <Table {...tableProps} />
        </div>
    );
};

export default PurchasesBusiness;
