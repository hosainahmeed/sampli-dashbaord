import React from 'react'
import { Table, Tabs, Tag } from 'antd'

const onChange = (key) => {
  console.log(key)
}

const productData = [
  {
    id: 1,
    name: 'Ox 18 Inches Standing Plus Fan',
    date: '23 Mar, 2024',
    status: 'Shipped',
    statusColor: 'purple',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 2,
    name: 'Mini Portable Refillable Sprayer Atomizer Bottle 5ml',
    date: '23 Mar, 2024',
    status: 'Waiting to be Shipped',
    statusColor: 'orange',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 3,
    name: 'Silicone Brush To Clean The Scalp Hair Brushes - Green',
    date: '23 Mar, 2024',
    status: 'Cancelled',
    statusColor: 'gray',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 4,
    name: 'BENGOO G9000 Stereo Gaming Headset',
    date: '23 Mar, 2024',
    status: 'Delivered',
    statusColor: 'green',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 5,
    name: 'Wireless Bluetooth Earbuds',
    date: '23 Mar, 2024',
    status: 'In Transit',
    statusColor: 'blue',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 6,
    name: 'Ox 18 Inches Standing Plus Fan',
    date: '23 Mar, 2024',
    status: 'Shipped',
    statusColor: 'purple',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 7,
    name: 'Mini Portable Refillable Sprayer Atomizer Bottle 5ml',
    date: '23 Mar, 2024',
    status: 'Waiting to be Shipped',
    statusColor: 'orange',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 8,
    name: 'Silicone Brush To Clean The Scalp Hair Brushes - Green',
    date: '23 Mar, 2024',
    status: 'Cancelled',
    statusColor: 'gray',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 9,
    name: 'BENGOO G9000 Stereo Gaming Headset',
    date: '23 Mar, 2024',
    status: 'Delivered',
    statusColor: 'green',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 10,
    name: 'Wireless Bluetooth Earbuds',
    date: '23 Mar, 2024',
    status: 'In Transit',
    statusColor: 'blue',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 11,
    name: 'Mini Portable Refillable Sprayer Atomizer Bottle 5ml',
    date: '23 Mar, 2024',
    status: 'Waiting to be Shipped',
    statusColor: 'orange',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 12,
    name: 'Silicone Brush To Clean The Scalp Hair Brushes - Green',
    date: '23 Mar, 2024',
    status: 'Cancelled',
    statusColor: 'gray',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 13,
    name: 'BENGOO G9000 Stereo Gaming Headset',
    date: '23 Mar, 2024',
    status: 'Delivered',
    statusColor: 'green',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 14,
    name: 'Wireless Bluetooth Earbuds',
    date: '23 Mar, 2024',
    status: 'In Transit',
    statusColor: 'blue',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 15,
    name: 'Ox 18 Inches Standing Plus Fan',
    date: '23 Mar, 2024',
    status: 'Shipped',
    statusColor: 'purple',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
]

const columns = [
  {
    title: 'Item name',
    dataIndex: 'name',
    key: 'name',
    render: (_, text) => (
      <div className="flex gap-2 items-center">
        <img src={text.image} alt={text.name} className="w-10 h-10" />
        <h3>{text.name}</h3>
      </div>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status, record) => (
      <Tag color={record.statusColor} key={status}>
        {status}
      </Tag>
    ),
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <div
        type="link"
        className="border text-blue-500 border-blue-500 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-100 flex items-center justify-center"
      >
        View
      </div>
    ),
  },
]

const items = [
  {
    key: '1',
    label: (
      <div className="flex gap-2">
        <div>In Progress/Delivered</div>
        <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
          4
        </p>
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
          position: ['bottomCenter'],
        }}
      />
    ),
  },

  {
    key: '2',
    label: (
      <div className="flex gap-2">
        <div>Cancelled</div>
        <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
          4
        </p>
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
          position: ['bottomCenter'],
          showSizeChanger: false,
        }}
      />
    ),
  },
]

const OfferShipmentsSampler = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-5 ">
          <div className="text-xl font-semibold">Offer Shipment</div>
        </div>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="cursor-pointer"
        />
      </div>
    </div>
  )
}

export default OfferShipmentsSampler
