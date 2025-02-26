import React from 'react'
import { Table, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

const productData = [
  {
    id: 1,
    name: 'Ox 18 Inches Standing Plus Fan',
    date: '23 Mar, 2024',
    ReviewEarnings: '$5',
    Commission: '$5',
    Total: '$10',
    image: `https://picsum.photos/seed/${Math.random()}/154`,
  },
  {
    id: 2,
    name: 'Mini Portable Refillable Sprayer Atomizer Bottle 5ml',
    date: '24 Mar, 2024',
    ReviewEarnings: '$3',
    Commission: '$2',
    Total: '$5',
    image: `https://picsum.photos/seed/${Math.random()}/155`,
  },
  {
    id: 3,
    name: 'Silicone Brush To Clean The Scalp Hair Brushes - Green',
    date: '25 Mar, 2024',
    ReviewEarnings: '$4',
    Commission: '$3',
    Total: '$7',
    image: `https://picsum.photos/seed/${Math.random()}/156`,
  },
  {
    id: 4,
    name: 'BENGOO G9000 Stereo Gaming Headset',
    date: '26 Mar, 2024',
    ReviewEarnings: '$6',
    Commission: '$4',
    Total: '$10',
    image: `https://picsum.photos/seed/${Math.random()}/157`,
  },
  {
    id: 5,
    name: 'Wireless Bluetooth Earbuds',
    date: '27 Mar, 2024',
    ReviewEarnings: '$7',
    Commission: '$3',
    Total: '$10',
    image: `https://picsum.photos/seed/${Math.random()}/158`,
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
    title: 'Review Earnings',
    dataIndex: 'ReviewEarnings',
    key: 'reviewEarnings',
  },
  {
    title: 'Commission',
    dataIndex: 'Commission',
    key: 'commission',
  },
  {
    title: 'Total',
    dataIndex: 'Total',
    key: 'total',
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

const ReviewsAndEarningsSampler = () => {
  const Navigate = useNavigate()
  return (
    <div className="mt-20">
      <div>
        <div className="flex justify-between items-center mb-5 mt-14 ">
          <div className="  text-xl font-semibold">
            Recent Reviews & Earnings
          </div>
          <div
            onClick={() => Navigate('/sampler/campaign/earnings')}
            className="border border-gray-300 px-3 py-2 text-sm text-gray-700  cursor-pointer rounded-md hover:bg-gray-100"
          >
            See all
          </div>
        </div>
        <div>
          {productData && productData.length > 0 ? (
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
              <p className="font-bold text-xl">No Reviews & Earnings Yet</p>
              <p className="mt-5 text-gray-500 max-w-[400px] w-full">
                Looks like you don't have any reviews yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewsAndEarningsSampler
