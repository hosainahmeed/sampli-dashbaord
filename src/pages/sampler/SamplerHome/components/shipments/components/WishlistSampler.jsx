import React from 'react'
import { Table, Button } from 'antd'
import toast from 'react-hot-toast'
import productImage from '/public/product_image.svg'

const productData = [
  {
    id: 1,
    name: 'BENGOO G9000 Stereo Gaming Headset',
    image: productImage,
    price: '$5.00',
  },
  {
    id: 2,
    name: 'Mini Portable Refillable Sprayer Atomizer Bottle 5ml',
    image: productImage,
    price: '$3.00',
  },
  {
    id: 3,
    name: 'Ox 18 Inches Standing Plus Fan',
    image: productImage,
    price: '$10.00',
  },
  {
    id: 4,
    name: 'Gaming Headset',
    image: productImage,
    price: '$7.00',
  },
  {
    id: 5,
    name: 'Portable Speaker',
    image: productImage,
    price: '$15.00',
  },
  {
    id: 6,
    name: 'Smartwatch',
    image: productImage,
    price: '$25.00',
  },
]

const columns = [
  {
    title: 'Item Image',
    dataIndex: 'image',
    key: 'image',
    render: (text) => (
      <img
        src={text}
        alt="product"
        className="w-16 h-16 object-cover rounded"
      />
    ),
  },
  {
    title: 'Item Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className="flex gap-4">
        <Button type="link" className="hover:!text-black !text-gray-500">
          Remove
        </Button>
        <button
          type="primary"
          onClick={() => {
            toast.success('Product added to cart')
          }}
          className="!text-blue-500 border border-blue-500 hover:bg-gray-100 cursor-pointer rounded px-3 py-2"
        >
          Buy now
        </button>
      </div>
    ),
  },
]

const WishlistSampler = () => {
  return (
    <div className="h-[94vh] overflow-auto scroll-y-auto scrollbar-none">
      <div className="flex justify-between items-center mb-5">
        <div className="text-xl font-semibold">Wishlist</div>
      </div>

      <Table
        columns={columns}
        dataSource={productData}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          position: ['bottomCenter'],
        }}
      />
    </div>
  )
}

export default WishlistSampler
