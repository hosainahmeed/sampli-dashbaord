import React, { useState } from 'react';
import { Table, Tag, Button, Input, Select } from 'antd';
import { FaAngleLeft } from 'react-icons/fa';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Option } = Select;
const OrderTable = ({ filterStatus }) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  console.log(statusFilter);
  const allOrders = [
    {
      key: '1',
      product: 'JBL Speaker',
      orderId: '#783838',
      date: '23rd Mar, 2023',
      customer: 'Adele Singer',
      amount: '50.00',
      status: 'Processing',
    },
    {
      key: '2',
      product: 'Sony Headphones',
      orderId: '#123456',
      date: '15th Feb, 2023',
      customer: 'John Doe',
      amount: '80.00',
      status: 'Delivered',
    },
    {
      key: '3',
      product: 'Apple Watch',
      orderId: '#654321',
      date: '10th Jan, 2023',
      customer: 'Jane Smith',
      amount: '200.00',
      status: 'Cancelled',
    },
    {
      key: '4',
      product: 'Samsung TV',
      orderId: '#987654',
      date: '1st Apr, 2023',
      customer: 'Mike Johnson',
      amount: '500.00',
      status: 'Processing',
    },
    {
      key: '5',
      product: 'Xbox Console',
      orderId: '#456789',
      date: '7th Mar, 2023',
      customer: 'Sarah Connor',
      amount: '300.00',
      status: 'Delivered',
    },
  ];

  const statusColors = {
    Processing: 'purple',
    Delivered: 'green',
    Cancelled: 'gray',
  };

  const filteredOrders = allOrders.filter(
    (order) =>
      (!filterStatus || order.status === filterStatus) &&
      (order.product.toLowerCase().includes(searchText.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
    {
      title: 'Order',
      dataIndex: 'product',
      key: 'product',
      render: (text, record) => (
        <span className="flex gap-2 items-center">
          <img
            className="w-8 h-8 rounded-sm object-cover"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/ecad41185062331.655d204e38fad.jpg"
            alt="Product"
          />
          <div>
            <h1 className="text-sm font-medium">{text}</h1>
            <h2 className="text-xs text-gray-500">{record.orderId}</h2>
          </div>
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span>${amount}</span>,
    },
    {
      title: 'Fulfillment',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
        <Link to="/sales/single-order" state={record}>
          <Button type="default">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="pb-12">
      <div className="flex items-center gap-12 mb-4">
        <div className="w-full flex md:flex-row flex-col gap-2 md:items-center justify-between">
          <Input
            className="!rounded-full !w-full md:!w-[300px]"
            placeholder="Search by Order ID, Product, or Customer"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            
          />
          <Select
            placeholder="Filter"
            onChange={setStatusFilter}
            style={{ width: 120, marginBottom: 16 }}
          >
            <Option value="delivered">Delivered</Option>
            <Option value="processing">Processing</Option>
            <Option value="cancelled">Cancelled</Option>
            <Option value="shipping">Shipping</Option>
          </Select>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredOrders}
        scroll={{ x: 900}}
        pagination={{
          showSizeChanger: false,
          defaultPageSize: 5,
          defaultCurrent: 1,
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

export default OrderTable;
