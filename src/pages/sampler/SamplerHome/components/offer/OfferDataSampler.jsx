import React from 'react'
import OfferCardSampler from './OfferCardSampler'
import { useNavigate } from 'react-router-dom'
import productImage from '/public/product_image.svg'

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
]
const OfferDataSampler = () => {
  const Navigate = useNavigate()
  return (
    <div className="">
      <div className="flex justify-between items-center mb-5 mt-14 ">
        <div className="  text-xl font-semibold">Offers</div>
        <div
          onClick={() => Navigate('/sampler/campaign/all-offer')}
          className="border border-gray-300 px-3 py-2 text-sm text-gray-700  cursor-pointer rounded-md hover:bg-gray-100"
        >
          See all
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {productData && productData.length > 0 ? (
          productData.map((product) => (
            <OfferCardSampler key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-5 text-center  flex flex-col items-center justify-center py-10 w-full h-[30vh]">
            <p className="font-bold text-xl">No Active Offers Yet</p>
            <p className="mt-5 text-gray-500">
              Looks like you don&apos;t have any offers at the moment. Check
              back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OfferDataSampler
