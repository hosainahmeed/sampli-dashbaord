import React, { useState } from 'react';
import { Table, Tag, Progress, Input, Button, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const { Option } = Select;

const CampaignTable = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();
  const totalSpent = 1000;
  const totalBudget = 2000;
  const campaigns = [
    {
      key: '1',
      id: 1,
      name: 'Summer Collection Review Group 1',
      createdAt: '2023-06-01',
      status: 'Active',
      progress: 10,
      total: 300,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg',
    },
    {
      key: '2',
      id: 2,
      name: 'Summer Collection Review Group 2',
      createdAt: '2023-06-02',
      status: 'Active',
      progress: 20,
      total: 500,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/summer-beach-party-flat-design_23-2148443417.jpg',
    },
    {
      key: '3',
      id: 3,
      name: 'Summer Collection Review Group 3',
      createdAt: '2023-06-03',
      status: 'Active',
      progress: 30,
      total: 1000,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/summer-elements-collection_23-2148443418.jpg',
    },
    {
      key: '4',
      id: 4,
      name: 'Summer Collection Review Group 4',
      createdAt: '2023-06-04',
      status: 'Active',
      progress: 40,
      total: 2000,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/summer-background-with-palm-trees-and-flamingos_23-2148443420.jpg',
    },
    {
      key: '5',
      id: 5,
      name: 'Summer Collection Review Group 5',
      createdAt: '2023-06-05',
      status: 'Active',
      progress: 50,
      total: 3000,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/summer-party-invitation-with-flamingos_23-2148443421.jpg',
    },
    {
      key: '6',
      id: 6,
      name: 'Summer Collection Review Group 6',
      createdAt: '2023-06-06',
      status: 'Active',
      progress: 60,
      total: 4000,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/summer-elements-collection-with-palm-trees_23-2148443422.jpg',
    },
    {
      key: '7',
      id: 7,
      name: 'Summer Collection Review Group 7',
      createdAt: '2023-06-07',
      status: 'Active',
      progress: 70,
      total: 5000,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/summer-party-with-palm-trees-and-flamingos_23-2148443423.jpg',
    },
    {
      key: '8',
      id: 8,
      name: 'Summer Collection Review Group 8',
      createdAt: '2023-06-08',
      status: 'Active',
      progress: 80,
      total: 6000,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/summer-elements-collection-with-flamingos_23-2148443424.jpg',
    },
    {
      key: '9',
      id: 9,
      name: 'Summer Collection Review Group 9',
      createdAt: '2023-06-09',
      status: 'Active',
      progress: 90,
      total: 7000,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/summer-party-with-flamingos-and-palm-trees_23-2148443425.jpg',
    },
    {
      key: '10',
      id: 10,
      name: 'Summer Collection Review Group 10',
      createdAt: '2023-06-10',
      status: 'Active',
      progress: 100,
      total: 8000,
      budget: (
        <span>
          $
          {totalSpent.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {' of '}
          <span className="text-[#6D7486]">
            ${' '}
            {totalBudget.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
      ),
      image:
        'https://img.freepik.com/free-vector/summer-elements-collection-with-flamingos-and-palm-trees_23-2148443426.jpg',
    },
  ];

  const statusColors = {
    Active: 'orange',
    Pending: 'purple',
    Completed: 'green',
    Paused: 'gray',
  };

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter === 'All' || campaign.status === statusFilter)
  );

  const columns = [
    {
      title: 'Campaign Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
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
      render: (budget) => <p className="xl:text-sm text-xs">{budget}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="default"
          className='!border-blue-500 !text-blue-500 hover:bg-gray-100'
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
      <h2 className="my-3 text-2xl font-semibold">Campaign</h2>
      <div className="flex w-full justify-between ">
        <div className="flex item-center gap-12 ">
          <Input
            className="!rounded-full"
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300, marginBottom: 16, marginRight: 16 }}
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
          total: filteredCampaigns.length,
          position: ['bottomCenter'],
          itemRender: (current, type, originalElement) => {
            if (type === 'prev') {
              return (
                <Button className="!border-none ">
                  <FaAngleLeft />
                </Button>
              );
            }
            if (type === 'next') {
              return (
                <Button className="!border-none ">
                  <FaAngleRight />
                </Button>
              );
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
