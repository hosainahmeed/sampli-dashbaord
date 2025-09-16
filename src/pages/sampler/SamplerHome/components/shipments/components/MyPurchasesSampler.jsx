import React, { useState } from "react";
import { Table, Tabs, Tag } from "antd";
import OrderDetails from "./OrderDetails";
import productImage from "/public/product_image.svg";
import { useGetOrderListQuery } from "../../../../../../Redux/sampler/orderApis";
import Loader from "../../../../../loader/Loader";

const onChange = (key) => {
  console.log(key);
};

// const productData = [
//   {
//     id: 1,
//     name: "Ox 18 Inches Standing Plus Fan",
//     date: "23 Mar, 2024",
//     status: "Shipped",
//     statusColor: "purple",
//     image: productImage,
//   },
//   {
//     id: 2,
//     name: "Mini Portable Refillable Sprayer Atomizer Bottle 5ml",
//     date: "23 Mar, 2024",
//     status: "Waiting to be Shipped",
//     statusColor: "orange",
//     image: productImage,
//   },
//   {
//     id: 3,
//     name: "Silicone Brush To Clean The Scalp Hair Brushes - Green",
//     date: "23 Mar, 2024",
//     status: "Cancelled",
//     statusColor: "gray",
//     image: productImage,
//   },
//   {
//     id: 4,
//     name: "BENGOO G9000 Stereo Gaming Headset",
//     date: "23 Mar, 2024",
//     status: "Delivered",
//     statusColor: "green",
//     image: productImage,
//   },
//   {
//     id: 5,
//     name: "Wireless Bluetooth Earbuds",
//     date: "23 Mar, 2024",
//     status: "In Transit",
//     statusColor: "blue",
//     image: productImage,
//   },
//   {
//     id: 6,
//     name: "Ox 18 Inches Standing Plus Fan",
//     date: "23 Mar, 2024",
//     status: "Shipped",
//     statusColor: "purple",
//     image: productImage,
//   },
//   {
//     id: 7,
//     name: "Mini Portable Refillable Sprayer Atomizer Bottle 5ml",
//     date: "23 Mar, 2024",
//     status: "Waiting to be Shipped",
//     statusColor: "orange",
//     image: productImage,
//   },
//   {
//     id: 8,
//     name: "Silicone Brush To Clean The Scalp Hair Brushes - Green",
//     date: "23 Mar, 2024",
//     status: "Cancelled",
//     statusColor: "gray",
//     image: productImage,
//   },
//   {
//     id: 9,
//     name: "BENGOO G9000 Stereo Gaming Headset",
//     date: "23 Mar, 2024",
//     status: "Delivered",
//     statusColor: "green",
//     image: productImage,
//   },
//   {
//     id: 10,
//     name: "Wireless Bluetooth Earbuds",
//     date: "23 Mar, 2024",
//     status: "In Transit",
//     statusColor: "blue",
//     image: productImage,
//   },
//   {
//     id: 11,
//     name: "Mini Portable Refillable Sprayer Atomizer Bottle 5ml",
//     date: "23 Mar, 2024",
//     status: "Waiting to be Shipped",
//     statusColor: "orange",
//     image: productImage,
//   },
//   {
//     id: 12,
//     name: "Silicone Brush To Clean The Scalp Hair Brushes - Green",
//     date: "23 Mar, 2024",
//     status: "Cancelled",
//     statusColor: "gray",
//     image: productImage,
//   },
//   {
//     id: 13,
//     name: "BENGOO G9000 Stereo Gaming Headset",
//     date: "23 Mar, 2024",
//     status: "Delivered",
//     statusColor: "green",
//     image: productImage,
//   },
//   {
//     id: 14,
//     name: "Wireless Bluetooth Earbuds",
//     date: "23 Mar, 2024",
//     status: "In Transit",
//     statusColor: "blue",
//     image: productImage,
//   },
//   {
//     id: 15,
//     name: "Ox 18 Inches Standing Plus Fan",
//     date: "23 Mar, 2024",
//     status: "Shipped",
//     statusColor: "purple",
//     image: productImage,
//   },
// ];

const MyPurchasesSampler = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: getAllOrder, isLoading: isLoadingOrder } = useGetOrderListQuery(
    {
      page,
      limit: pageSize,
    }
  );

  console.log(getAllOrder);

  const productData =
    getAllOrder?.data?.result?.map((order) => ({
      key: order._id,
      name: order.items[0]?.product?.name || "Unnamed product",
      image:
        order.items[0]?.product?.images?.[0] ||
        "https://via.placeholder.com/40",
      length: order?.items?.length,
      date: new Date(order.createdAt).toLocaleDateString(),
      status: order.deliveryStatus || "Unknown",
      statusColor:
        order.paymentStatus === "Success"
          ? "green"
          : order.paymentStatus === "Pending"
          ? "orange"
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
          <div className="flex items-center">
            <h3 className="text-sm font-medium">{record.name}</h3>
            {record.length > 1 && (
              <span className="text-xs font-light ml-2">
                ({record.length} more items)
              </span>
            )}
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
        <Tag color={record.statusColor} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <div
          type="link"
          className="border text-blue-500 border-blue-500 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-100 flex items-center justify-center"
          onClick={() => setIsClicked(true)}
        >
          View
        </div>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-2">
          <div>In Progress/Delivered</div>
          {/* <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
            4
          </p> */}
        </div>
      ),
      children: (
        <Table
          key="table1"
          columns={columns}
          dataSource={productData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            position: ["bottomCenter"],
          }}
          scroll={{ x: 1200 }}
        />
      ),
    },

    {
      key: "2",
      label: (
        <div className="flex gap-2">
          <div>Cancelled/Returned</div>
          {/* <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
            4
          </p> */}
        </div>
      ),
      children: (
        <Table
          key="table2"
          columns={columns}
          dataSource={productData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            position: ["bottomCenter"],
            showSizeChanger: false,
          }}
          scroll={{ x: 1200 }}
        />
      ),
    },
  ];
  return (
    <div className="h-[94vh] overflow-auto scroll-y-auto scrollbar-none">
      {isClicked ? (
        <OrderDetails setIsClicked={setIsClicked} />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-5 ">
            <div className="text-xl font-semibold">My Purchases</div>
          </div>
          {isLoadingOrder ? (
            <div className="h-screen">
              <Loader message={"Loading your orders..."} />
            </div>
          ) : (
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              className="cursor-pointer !text-white"
              pagination={{
                current: getAllOrder?.data?.meta?.page || page,
                pageSize: getAllOrder?.data?.meta?.limit || pageSize,
                total: getAllOrder?.data?.meta?.total || 0,
                onChange: (page, pageSize) => {
                  setPage((prev) => prev + 1);
                  setPageSize(pageSize);
                },
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyPurchasesSampler;
