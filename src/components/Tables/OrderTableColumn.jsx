import React from 'react'
import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';

export const OrderTableColumn = () => [
  {
    title: 'Order',
    dataIndex: 'product',
    key: 'product',
    render: (text, record) => (
      <span className="flex gap-2 items-center">
        <img
          className="w-8 h-8 rounded-sm object-cover"
          src={record?.productImage}
          alt="Product"
        />
        <div>
          <h1 className="text-sm font-medium">{text}</h1>
          <h2 className="text-xs text-gray-500">{record?.orderId}</h2>
        </div>
      </span>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) =>
      <span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(text))}</span>,
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
    render: (amount) => <span>${amount.toFixed(2)}</span>,
  },
  {
    title: 'Fulfillment',
    dataIndex: 'deliveryStatus',
    key: 'deliveryStatus',
    render: (status) => <Tag>{status}</Tag>,
  },
  {
    title: 'Payment',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    render: (status) => <Tag>{status}</Tag>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Link to="/sales/single-order" state={{ orderId: record?.orderId }}>
        <Button type="default">View</Button>
      </Link>
    ),
  },
];
