import React, { useState } from "react";
import { Table, Tag, Progress, Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const { Option } = Select;

const CampaignTable = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const campaigns = [
    {
      key: "1",
      id: 1,
      name: "Summer Collection Review Group 1",
      createdAt: "2023-06-01",
      status: "Active",
      progress: 10,
      total: 300,
      budget: "$25,000 of $100,000",
      image:
        "https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg",
    },
  ];

  const statusColors = {
    Active: "orange",
    Pending: "purple",
    Completed: "green",
    Paused: "gray",
  };

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter === "All" || campaign.status === statusFilter)
  );

  const columns = [
    {
      title: "Campaign Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span className="flex gap-2 item-center">
          {record.image && (
            <img
              className="w-8 xl:w-12 rounded-sm h-6 xl:h-8 object-cover"
              src={record.image}
              alt="Campaign"
            />
          )}
          <div>
            <h1 className="xl:text-sm text-xs">{text}</h1>
            <h1 className="text-xs">{record.createdAt}</h1>
          </div>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress, record) => (
        <Progress
          className="xl:text-base text-xs"
          percent={(progress / record.total) * 100}
          format={(percent, successPercent) => `${progress}/${record.total}`}
        />
      ),
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      render: (budget) => <p className="xl:text-sm text-xs">{budget}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="default"
          onClick={() => {
            navigate(`single-campaign`, { state: { id: record.id } });
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="py-12">
      <h2 className="my-3 text-2xl">Campaign</h2>
      <div className="flex w-full justify-between ">
        <div className="flex item-center gap-12 ">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200, marginBottom: 16, marginRight: 16 }}
          />
        </div>
        <Select
          defaultValue="All"
          onChange={setStatusFilter}
          style={{ width: 120, marginBottom: 16 }}
        >
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Pending">Scheduled</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Paused">Paused</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredCampaigns}
        locale={{
          filterConfirm: "Confirm",
          filterReset: "Reset",
          emptyText: (
            <div className=" flex items-center justify-center flex-col py-28 text-center">
              <p className="text-2xl">No result found</p>
              <p>Try clearing the filters or changing your input</p>
            </div>
          ),
        }}
        pagination={{
          showSizeChanger: false,
          defaultPageSize: 5,
          defaultCurrent: 1,
          total: filteredCampaigns.length,
          position: ["bottomCenter"],
          itemRender: (current, type, originalElement) => {
            if (type === "prev") {
              return (
                <Button className="!border-none ">
                  <FaAngleLeft />
                </Button>
              );
            }
            if (type === "next") {
              return (
                <Button className="!border-none ">
                  <FaAngleRight />
                </Button>
              );
            }
            if (type === "page") {
              return current;
            }
            return originalElement;
          },
        }}
      />
    </div>
  );
};

export default CampaignTable;
