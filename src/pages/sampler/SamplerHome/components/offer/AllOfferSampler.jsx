import React from 'react'
import { Tabs } from 'antd'
import OfferCardSampler from './OfferCardSampler'
import productImage from '/public/product_image.svg'
const onChange = (key) => {
  console.log(key)
}

const productData = [
  {
    id: 1,
    image: productImage,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 5 days',
    status: 'Offer Accepted',
  },
  {
    id: 2,
    image: productImage,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 4 days',
    status: 'Offer Expired',
  },
  {
    id: 3,
    image: productImage,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 3 days',
    status: 'Accept Offer',
  },
  {
    id: 4,
    image: productImage,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 2 days',
    status: 'Accept Offer',
  },
  {
    id: 5,
    image: productImage,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 1 days',
    status: 'Accept Offer',
  },
  {
    id: 6,
    image: productImage,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 1 days',
    status: 'Completed Offer',
  },
  {
    id: 7,
    image: productImage,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 1 days',
    status: 'Completed Offer',
  },
  {
    id: 8,
    image: productImage,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 1 days',
    status: 'Completed Offer',
  },
]

const items = [
  {
    key: '1',
    label: (
      <div className="flex gap-2">
        <div>New</div>
        <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
          3
        </p>
      </div>
    ),
    children: (
      <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1  gap-5 items-center flex-wrap ">
        {productData && productData.length > 0 ? (
          productData.map(
            (product) =>
              product.status === 'Accept Offer' && (
                <OfferCardSampler key={product.id} product={product} />
              )
          )
        ) : (
          <div className="text-center  flex flex-col items-center justify-center py-10 w-full h-[60vh]">
            <p className="font-bold text-xl">No Active Offers Yet</p>
            <p className="mt-5 text-gray-500">
              Looks like you don&apos;t have any offers at the moment. Check
              back soon!
            </p>
          </div>
        )}
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className="flex gap-2">
        <div>Processing</div>
        <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
          1
        </p>
      </div>
    ),
    children: (
      <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 items-center flex-wrap ">
        {productData && productData.length > 0 ? (
          productData.map(
            (product) =>
              product.status === 'Offer Accepted' && (
                <OfferCardSampler key={product.id} product={product} />
              )
          )
        ) : (
          <div className="text-center  flex flex-col items-center justify-center py-10 w-full h-[60vh]">
            <p className="font-bold text-xl">No Processing Offers Yet</p>
            <p className="mt-5 text-gray-500">
              Looks like you don&apos;t have any offers that are currently being
              processed. Check back soon!
            </p>
          </div>
        )}
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div className="flex gap-2">
        <div>Completed</div>
        <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
          3
        </p>
      </div>
    ),
    children: (
      <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 items-center flex-wrap ">
        {productData && productData.length > 0 ? (
          productData.map(
            (product) =>
              product.status === 'Completed Offer' && (
                <OfferCardSampler key={product.id} product={product} />
              )
          )
        ) : (
          <div className="text-center  flex flex-col items-center justify-center py-10 w-full h-[60vh]">
            <p className="font-bold text-xl">No Completed Offers Yet</p>
            <p className="mt-5 text-gray-500">
              Looks like you don&apos;t have any completed offers at the moment.
              Check back soon!
            </p>
          </div>
        )}
      </div>
    ),
  },
  {
    key: '4',
    label: (
      <div className="flex gap-2">
        <div>Expired</div>
        <p className="text-red-400 rounded-full h-5 w-5 p-1.5 bg-red-100 border border-red-400 flex items-center justify-center">
          1
        </p>
      </div>
    ),
    children: (
      <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1  gap-5 items-center flex-wrap ">
        {productData && productData.length > 0 ? (
          productData.map(
            (product) =>
              product.status === 'Offer Expired' && (
                <OfferCardSampler key={product.id} product={product} />
              )
          )
        ) : (
          <div className="text-center  flex flex-col items-center justify-center py-10 w-full h-[60vh]">
            <p className="font-bold text-xl">No Expired Offers Yet</p>
            <p className="mt-5 text-gray-500">
              Looks like you don&apos;t have any expired offers at the moment.
              Check back soon!
            </p>
          </div>
        )}
      </div>
    ),
  },
]
const AllOfferSampler = () => {
  return (
    <div className="responsive-width !mt-5 h-screen">
      <div className="text-2xl font-semibold">Offers</div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default AllOfferSampler
