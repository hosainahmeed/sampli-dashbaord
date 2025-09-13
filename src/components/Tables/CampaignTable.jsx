import React, { useState } from 'react';
import { Table, Tag, Progress, Input, Button, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import { useGetCampaignsQuery } from '../../Redux/businessApis/campaign/campaignApis';

const { Option } = Select;

const CampaignTable = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { data: campaignsData, isLoading } = useGetCampaignsQuery();
  console.log(campaignsData?.data?.result)
  const navigate = useNavigate();
  // const totalSpent = 1000;
  // const totalBudget = 2000;
  // const campaigns = [
  //   {
  //     key: '1',
  //     id: 1,
  //     name: 'Summer Collection Review Group 1',
  //     startAt: '2023-06-01',
  //     endAt: '2023-06-01',
  //     status: 'Active',
  //     progress: 10,
  //     total: 300,
  //     budget: (
  //       <span>
  //         $
  //         {totalSpent.toLocaleString('en-US', {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //         {' of '}
  //         <span>
  //           ${' '}
  //           {totalBudget.toLocaleString('en-US', {
  //             minimumFractionDigits: 2,
  //             maximumFractionDigits: 2,
  //           })}
  //         </span>
  //       </span>
  //     ),
  //     image:
  //       'https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg',
  //   },
  //   {
  //     key: '2',
  //     id: 2,
  //     name: 'Summer Collection Review Group 2',
  //     startAt: '2023-06-02',
  //     endAt: '2023-06-02',
  //     status: 'Scheduled',
  //     progress: 20,
  //     total: 500,
  //     budget: (
  //       <span>
  //         $
  //         {totalSpent.toLocaleString('en-US', {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //         {' of '}
  //         <span>
  //           ${' '}
  //           {totalBudget.toLocaleString('en-US', {
  //             minimumFractionDigits: 2,
  //             maximumFractionDigits: 2,
  //           })}
  //         </span>
  //       </span>
  //     ),
  //     image:
  //       'https://img.freepik.com/free-vector/summer-beach-party-flat-design_23-2148443417.jpg',
  //   },
  //   {
  //     key: '3',
  //     id: 3,
  //     name: 'Summer Collection Review Group 3',
  //     startAt: '2023-06-03',
  //     endAt: '2023-06-03',
  //     status: 'Completed',
  //     progress: 30,
  //     total: 1000,
  //     budget: (
  //       <span>
  //         $
  //         {totalSpent.toLocaleString('en-US', {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //         {' of '}
  //         <span>
  //           ${' '}
  //           {totalBudget.toLocaleString('en-US', {
  //             minimumFractionDigits: 2,
  //             maximumFractionDigits: 2,
  //           })}
  //         </span>
  //       </span>
  //     ),
  //     image:
  //       'https://img.freepik.com/free-vector/summer-elements-collection_23-2148443418.jpg',
  //   },
  //   {
  //     key: '2',
  //     id: 2,
  //     name: 'Summer Collection Review Group 2',
  //     startAt: '2023-06-02',
  //     endAt: '2023-06-02',
  //     status: 'Scheduled',
  //     progress: 20,
  //     total: 500,
  //     budget: (
  //       <span>
  //         $
  //         {totalSpent.toLocaleString('en-US', {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //         {' of '}
  //         <span>
  //           ${' '}
  //           {totalBudget.toLocaleString('en-US', {
  //             minimumFractionDigits: 2,
  //             maximumFractionDigits: 2,
  //           })}
  //         </span>
  //       </span>
  //     ),
  //     image:
  //       'https://img.freepik.com/free-vector/summer-beach-party-flat-design_23-2148443417.jpg',
  //   },
  //   {
  //     key: '3',
  //     id: 3,
  //     name: 'Summer Collection Review Group 3',
  //     startAt: '2023-06-03',
  //     endAt: '2023-06-03',
  //     status: 'Completed',
  //     progress: 30,
  //     total: 1000,
  //     budget: (
  //       <span>
  //         $
  //         {totalSpent.toLocaleString('en-US', {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //         {' of '}
  //         <span>
  //           ${' '}
  //           {totalBudget.toLocaleString('en-US', {
  //             minimumFractionDigits: 2,
  //             maximumFractionDigits: 2,
  //           })}
  //         </span>
  //       </span>
  //     ),
  //     image:
  //       'https://img.freepik.com/free-vector/summer-elements-collection_23-2148443418.jpg',
  //   },
  //   {
  //     key: '2',
  //     id: 2,
  //     name: 'Summer Collection Review Group 2',
  //     startAt: '2023-06-02',
  //     endAt: '2023-06-02',
  //     status: 'Scheduled',
  //     progress: 20,
  //     total: 500,
  //     budget: (
  //       <span>
  //         $
  //         {totalSpent.toLocaleString('en-US', {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //         {' of '}
  //         <span>
  //           ${' '}
  //           {totalBudget.toLocaleString('en-US', {
  //             minimumFractionDigits: 2,
  //             maximumFractionDigits: 2,
  //           })}
  //         </span>
  //       </span>
  //     ),
  //     image:
  //       'https://img.freepik.com/free-vector/summer-beach-party-flat-design_23-2148443417.jpg',
  //   },
  //   {
  //     key: '3',
  //     id: 3,
  //     name: 'Summer Collection Review Group 3',
  //     startAt: '2023-06-03',
  //     endAt: '2023-06-03',
  //     status: 'Completed',
  //     progress: 30,
  //     total: 1000,
  //     budget: (
  //       <span>
  //         $
  //         {totalSpent.toLocaleString('en-US', {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //         {' of '}
  //         <span>
  //           ${' '}
  //           {totalBudget.toLocaleString('en-US', {
  //             minimumFractionDigits: 2,
  //             maximumFractionDigits: 2,
  //           })}
  //         </span>
  //       </span>
  //     ),
  //     image:
  //       'https://img.freepik.com/free-vector/summer-elements-collection_23-2148443418.jpg',
  //   },
  // ];

  const statusColors = {
    Active: 'orange',
    Pending: 'purple',
    Completed: 'green',
    Paused: 'gray',
  };

  // const filteredCampaigns = campaigns.filter(
  //   (campaign) =>
  //     campaign.name.toLowerCase().includes(searchText.toLowerCase()) &&
  //     (statusFilter === 'All' || campaign.status === statusFilter)
  // );

  const columns = [
    {
      title: 'Campaign Name',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      render: (text, record) => (
        <span className="flex gap-2 items-center">
          {record?.product?.images && (
            <img
              className="w-8 xl:w-12 rounded-sm h-6 xl:h-8 object-cover"
              src={record?.product?.images[0]}
              alt="Campaign"
            />
          )}
          <div>
            <h1 className="xl:text-sm text-xs">{text}</h1>
            <div className="flex items-center gap-2">
              <h1 className="text-xs text-[#6D7486]">
                {new Date(record.startDate).toLocaleString('default', {
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                -{' '}
                {new Date(record.endDate).toLocaleString('default', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </h1>
            </div>
          </div>
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 180,
      render: (progress, record) => (
        <Progress
          className="xl:text-base text-xs"
          percent={(progress / record.total) * 100}
          format={(percent, successPercent) => `${progress}/${record.total}`}
        />
      ),
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      width: 150,
      render: (budget) => (
        <p className="xl:text-sm text-xs text-[#6D7486]">{budget}</p>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (text, record) => (
        <Button
          type="default"
          className="!border-blue-500 !text-blue-500 hover:bg-gray-100"
          onClick={() => {
            navigate(`single-campaign`, { state: { id: record._id } });
          }}
        >
          View
        </Button>
      ),
    },
  ];

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
        >
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Scheduled">Scheduled</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Paused">Paused</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={campaignsData?.data?.result}
        scroll={{ x: 1200 }}
        locale={{
          filterConfirm: 'Confirm',
          filterReset: 'Reset',
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
          total: campaignsData?.data?.meta?.total,
          position: ['bottomCenter'],
          itemRender: (current, type, originalElement) => {
            if (type === 'prev' && current > 1) {
              return (
                <Button className="!border-none ">
                  <FaAngleLeft />
                </Button>
              );
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
  );
};

export default CampaignTable;
