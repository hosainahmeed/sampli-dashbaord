import React, { useState } from 'react';
import { Table, Tag, Input, Button, Select, Modal, Dropdown } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import UploadCsv from '../page-Component/UploadCsv';
import {
  FaAngleLeft,
  FaAngleRight,
  FaEdit,
  FaEye,
  FaTrash,
} from 'react-icons/fa';

const { Option } = Select;

const ProductTable = ({ filterStatus }) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState(null);
  const [openCsv, setOpenCsv] = useState(false);
  console.log(filterStatus);
  const campaigns = [
    {
      key: '1',
      item_id: '121321',
      item_category: 'Shoes',
      id: 1,
      name: 'Summer Collection Review Group 1',
      createdAt: <span className="text-[#6D7486]">2023-03-23</span>,
      status: 'Active',
      progress: 10,
      total: <span className="text-[#6D7486]">300</span>,
      salse: <span className='text-[#6D7486]'>40</span>,
      budget: <span className="text-[#6D7486]">$25,000 of $100,000</span>,
      image:
        'https://img.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg',
    },
  ];

  const statusColors = {
    Active: 'orange',
    Pending: 'purple',
    Completed: 'green',
    Paused: 'gray',
  };

  const filteredCampaigns = campaigns
    .filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (statusFilter === 'All' || campaign.status === statusFilter)
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (sortKey === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortKey === 'date') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  const items = [
    {
      key: '1',
      label: (
        <Button className="w-full  !bg-transparent !justify-start !shadow-none !border-none">
          <FaEye /> View Product
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button className="w-full !border-none !bg-transparent !justify-start hover:!text-red-500 !shadow-none ">
          <FaTrash /> Delete Product
        </Button>
      ),
    },
    {
      key: '3',
      label: (
        <Link className="w-full" to="/">
          <Button className="w-full !bg-transparent !justify-start hover:!text-blue-500 !shadow-none !border-none">
            <FaEdit />
            Edit Product
          </Button>
        </Link>
      ),
    },
  ];
  const columns = [
    {
      title: <span className="text-xs xl:text-lg">Item Name</span>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span className="flex gap-2 item-center">
          {record.image && (
            <img
              className="w-12 rounded-sm h-8 object-cover"
              src={record.image}
              alt="Campaign"
            />
          )}
          <div>
            <h1 className="text-xs xl:text-sm">{text}</h1>
            <div className="flex items-center text-[#6D7486] gap-2">
              <span className="text-xs  xl:text-sm">#{record.item_id}</span>
              <span>• {record.item_category}</span>
            </div>
          </div>
        </span>
      ),
    },
    {
      title: <span className="text-xs xl:text-lg">Price</span>,
      dataIndex: 'budget',
      key: 'budget',
    },
    {
      title: <span className="text-xs xl:text-lg">Status</span>,
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: <span className="text-xs xl:text-lg">In Stocks</span>,
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: <span className="text-xs xl:text-lg">Total Sales</span>,
      dataIndex: 'salse',
      key: 'salse',
    },
    {
      title: <span className="text-xs xl:text-lg">Date created</span>,
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: <span className="text-xs xl:text-lg">Action</span>,
      key: 'action',
      render: (text, record) => (
        <Dropdown
          menu={{
            items,
            align: {
              points: ['bl', 'tl'],
              offset: [0, -4],
            },
          }}
          placement="bottomLeft"
          arrow
        >
          <Button type="default" className="!border-none ">
            <BsThreeDots />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="pb-12">
      <div className="flex w-full mt-12 justify-between ">
        <div className="flex item-center gap-12">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300, marginBottom: 16, marginRight: 16 }}
          />
        </div>
        <div className="flex-center-center gap-2">
          <Select
            placeholder="Sort by"
            onChange={setSortKey}
            style={{ width: 120, marginBottom: 16 }}
          >
            <Option value="date">Date</Option>
            <Option value="name">Name</Option>
          </Select>
          <Select
            placeholder="Filter"
            onChange={setStatusFilter}
            style={{ width: 120, marginBottom: 16 }}
          >
            <Option value="active">Active</Option>
            <Option value="draft">Draft</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredCampaigns}
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
          showSizeChanger: false,
          defaultPageSize: 5,
          defaultCurrent: 1,
          position: ['bottomCenter'],
          itemRender:(current, type, originalElement) => {
            if (type === 'prev' && current > 1) {
              return (
                <Button className="!border-none ">
                  <FaAngleLeft />
                </Button>
              );
            }
            if (type === 'next') {
              return <h1 className='text-[#2E78E9]'>Next Page</h1>;
            }
            if (type === 'page') {
              return current;
            }
            return originalElement;
          },
        }}
      />
      <Modal
        centered
        footer={null}
        open={openCsv}
        onCancel={() => setOpenCsv(false)}
        title="Upload CSV File"
        width={'fit-content'}
      >
        <UploadCsv setOpenCsv={setOpenCsv} />
      </Modal>
    </div>
  );
};

export default ProductTable;
