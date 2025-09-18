import React, { useState } from "react";
import { Table, Tabs, Tag } from "antd";
import OfferOrderDetails from "../../offer/components/OfferOrderDetails";
import {
  useGetMyCampaignOfferQuery,
  useGetSingleOfferCampaignQuery,
} from "../../../../../../Redux/sampler/campaignApis";

const OfferShipmentsSampler = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: getMyCampaignOffer, isLoading: campaignLoading } =
    useGetMyCampaignOfferQuery({ page, limit });
  const [id, setId] = useState("");

  const [isClicked, setIsClicked] = useState(false);

  // Format API result into table rows
  const productData =
    getMyCampaignOffer?.data?.result?.map((item) => ({
      id: item._id,
      name: item.product?.name,
      image: item.product?.images?.[0],
      date: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(item.createdAt)),
      status: item.deliveryStatus,
      statusColor:
        item.deliveryStatus === "Waiting to be shipped"
          ? "orange"
          : item.deliveryStatus === "Delivered"
          ? "green"
          : "red",
    })) || [];

  const columns = [
    {
      title: "Item name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img src={record.image} alt={record.name} className="w-10 h-10" />
          <h3>{record.name}</h3>
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
        <div
          onClick={() => {
            setIsClicked(true);
            setId(record.id);
          }}
          className="border text-blue-500 border-blue-500 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-100 flex items-center justify-center"
        >
          View
        </div>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: <div className="flex gap-2">In Progress / Delivered</div>,
      children: (
        <Table
          loading={campaignLoading}
          columns={columns}
          dataSource={productData}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: limit,
            total: getMyCampaignOffer?.data?.meta?.total || 0,
            onChange: (p) => setPage(p + 1),
            position: ["bottomCenter"],
          }}
          scroll={{ x: 1200 }}
        />
      ),
    },
    {
      key: "2",
      label: <div className="flex gap-2">Cancelled</div>,
      children: (
        <Table
          loading={campaignLoading}
          columns={columns}
          dataSource={productData.filter((item) => item.status === "Cancelled")}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: limit,
            total: getMyCampaignOffer?.data?.meta?.total || 0,
            onChange: (p) => setPage(p + 1),
            position: ["bottomCenter"],
          }}
          scroll={{ x: 1200 }}
        />
      ),
    },
  ];

  return (
    <div className="h-[94vh] overflow-auto scrollbar-none">
      {isClicked ? (
        <OfferOrderDetails setIsClicked={setIsClicked} id={id} />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-5">
            <div className="text-xl font-semibold">Offer Shipment</div>
          </div>
          <Tabs defaultActiveKey="1" items={items} className="cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default OfferShipmentsSampler;
