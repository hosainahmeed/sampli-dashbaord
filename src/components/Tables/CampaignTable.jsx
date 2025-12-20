import React, { useState } from 'react';
import { Table, Input, Button, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaAngleLeft } from 'react-icons/fa';
import { useGetCampaignsQuery } from '../../Redux/businessApis/campaign/campaignApis';
import { CampaignTableColumn } from './CampaignTableColumn';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CampaignTable = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  const { data: campaignsData, isLoading, isFetching } = useGetCampaignsQuery({
    searchTerm: searchText,
    sortOrder: "desc",
    limit: pageSize,
    page: currentPage,
    seatchTerm: searchText,
    ...(statusFilter !== 'All' && { status: statusFilter }),
  });

  const campaigns = campaignsData?.data?.result;
  const statusColors = {
    Active: 'orange',
    Pending: 'purple',
    Completed: 'green',
    Paused: 'gray',
    Scheduled: 'blue',
    Cancelled: 'gray',
  };
  return (
    <div className="py-12">
      <h2 className="my-3 text-2xl font-semibold">Campaign</h2>
      <div className="flex w-full justify-between ">
        <div className="flex item-center gap-12 ">
          <Input
            className="!rounded-full !w-full md:!w-[300px]"
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, marginRight: 16 }}
          />
        </div>
        <Select
          defaultValue="All"
          onChange={setStatusFilter}
          style={{ width: 120, marginBottom: 16 }}
          loading={isFetching || isLoading}
        >
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Scheduled">Scheduled</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Paused">Paused</Option>
          <Option value="Cancelled">Cancelled</Option>
          <Option value="Expired">Expired</Option>
        </Select>
      </div>
      <Table
        columns={CampaignTableColumn({ statusColors, navigate })}
        loading={isFetching || isLoading}
        dataSource={campaigns}
        scroll={{ x: 'max-content' }}
        rowKey={(campaign) => campaign?._id}
        locale={{
          filterConfirm: 'Confirm',
          filterReset: 'Reset',
          emptyText: (
            <div className="flex items-center justify-center flex-col py-28 text-center">
              <p className="text-2xl">No result found</p>
              <p>Try clearing the filters or changing your input</p>
            </div>
          ),
        }}
        pagination={{
          current: campaignsData?.data?.meta?.page || 1,
          pageSize: campaignsData?.data?.meta?.limit || 5,
          total: campaignsData?.data?.meta?.total || 0,
          showSizeChanger: false,
          position: ['bottomCenter'],
          onChange: (page) => setCurrentPage(page),
          itemRender: (current, type, originalElement) => {
            if (type === 'prev' && current > 1) {
              return <Button className="!border-none"><FaAngleLeft /></Button>;
            }
            if (type === 'next') {
              return <h1 className="text-[#2E78E9]">Next Page</h1>;
            }
            if (type === 'page') {
              return current;
            }
            return originalElement;
          },
        }}

      />

    </div>
  )
};

export default CampaignTable;