import React from 'react'
import { Table, Tabs, Tag } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
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
]

const columns = [
  {
    title: 'Item name',
    dataIndex: 'name',
    key: 'name',
    render: (_, text) => (
      <div className="flex gap-2 items-center ">
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
      <Link to={`/sampler/campaign/shipments/my-purchases`}>
        <div
          type="link"
          className="border text-blue-500 border-blue-500 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-100 flex items-center justify-center"
        >
          View
        </div>
      </Link>
    ),
  },
]

const items = [
  {
    key: '1',
    label: (
      <div className="flex gap-2">
        <div>Offer shipment</div>
        <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
          4
        </p>
      </div>
    ),
    children: [
      productData && productData.length > 0 ? (
        <Table
          key="table"
          columns={columns}
          dataSource={productData}
          rowKey="id"
          pagination={false}
        />
      ) : (
        <div
          key="noOffers"
          className="text-center flex flex-col items-center justify-center py-10 w-full h-[30vh]"
        >
          <p className="font-bold text-xl">No Shipments to Track</p>
          <p className="mt-5 text-gray-500 max-w-[400px] w-full">
            Your shipment list is empty. Once you have active shipments, you'll
            be able to track them here and monitor their delivery status in
            real-time.
          </p>
        </div>
      ),
    ],
  },

  {
    key: '2',
    label: (
      <div className="flex gap-2">
        <div>My purchases</div>
        <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
          4
        </p>
      </div>
    ),
    children: [
      productData && productData.length > 0 ? (
        <Table
          key="table"
          columns={columns}
          dataSource={productData}
          rowKey="id"
          pagination={false}
        />
      ) : (
        <div
          key="noOffers"
          className="text-center flex flex-col items-center justify-center py-10 w-full h-[30vh]"
        >
          <p className="font-bold text-xl">No Shipments to Track</p>
          <p className="mt-5 text-gray-500 max-w-[400px] w-full">
            Your shipment list is empty. Once you have active shipments, you'll
            be able to track them here and monitor their delivery status in
            real-time.
          </p>
        </div>
      ),
    ],
  },
]
const ShipmentsSampler = () => {
  const Navigate = useNavigate()
  return (
    <div className="mt-20">
      <div>
        <div className="flex justify-between items-center mb-5 mt-14 ">
          <div className="  text-xl font-semibold">Shipments</div>
          <div
            onClick={() => Navigate('/sampler/campaign/all-offer')}
            className="border border-gray-300 px-3 py-2 text-sm text-gray-700  cursor-pointer rounded-md hover:bg-gray-100"
          >
            See all
          </div>
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

export default ShipmentsSampler
