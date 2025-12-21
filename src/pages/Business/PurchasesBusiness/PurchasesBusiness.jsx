
import React, { useEffect, useState } from "react";
import { Button, Table, Tabs, Tag } from "antd";
import { useGetCampaignPurchaseQuery } from "../../../Redux/businessApis/campaign/campaignPurchaseApis";
import { Link } from "react-router-dom";

const transformOrders = (orders) => {
    return orders.map((item) => ({
        key: item._id,
        name: item.product?.name,
        image: item.product?.images?.[0],
        campaign: item.campaign,
        date: new Date(item.createdAt).toLocaleDateString(),
        status: item.status,
        deliveryStatus: item.deliveryStatus,
        shipping: item.shipping,
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data, isLoading, isFetching } = useGetCampaignPurchaseQuery({
        page,
        limit: pageSize,
    });

    const orders = data?.data?.result ?? [];
    const meta = data?.data?.meta ?? {};
    const productData = transformOrders(orders);

    const columns = [
        {
            title: "Product",
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <div className="flex gap-2 items-center">
                    <img
                        src={record.image}
                        alt={record.name}
                        className="w-10 h-10 rounded object-cover"
                    />
                    <h3 className="text-sm font-medium">{record.name}</h3>
                </div>
            ),
        },
        {
            title: "Campaign",
            dataIndex: "campaign",
            key: "campaign",
            render: (_, record) => (
                <div className="flex flex-col gap-1 items-start">
                    <span className="text-lg font-medium"> {record.campaign?.name}</span>
                    <span className="text-sm flex gap-2 font-normal text-gray-400">Campaign Status: <Tag className="text-xs" color={record.statusColor}>{record?.status}</Tag></span>
                </div>
            ),
        },
        {
            title: "Shipping Amount",
            dataIndex: "shipping",
            key: "shipping",
            render: (shipping) => (
                <span>${shipping.amount}</span>
            ),
        },
        {
            title: "Shipping Status",
            dataIndex: "shipping",
            key: "shipping",
            render: (shipping) => (
                <Tag size="small" color={
                    shipping.status === "PURCHASED"
                        ? "green"
                        : shipping.status === "PENDING"
                            ? "orange"
                            : "red"
                }>{shipping.status}</Tag>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Link to={`/business/purchases/${record?.key}`} state={{ id: record?.key }}>
                    <Button
                        className="border text-blue-500 border-blue-500 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-100 flex items-center justify-center"
                    >
                        View
                    </Button>
                </Link>
            ),
        },
    ];


    const tableProps = {
        loading: isLoading || isFetching,
        columns,
        dataSource: productData,
        bordered: true,
        rowKey: "key",
        pagination: {
            current: meta?.page || page,
            pageSize: meta?.limit || pageSize,
            total: meta?.total || 0,
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
        scroll: { x:'max-content' },
    };

    return (
        <div className="w-full h-[calc(100vh-10rem)] overflow-auto scrollbar-none p-4">
            <div className="text-xl font-semibold mb-5">Campaign Offer / Offer Shipment</div>
            <Table {...tableProps} />
        </div>
    );
};

export default PurchasesBusiness;
