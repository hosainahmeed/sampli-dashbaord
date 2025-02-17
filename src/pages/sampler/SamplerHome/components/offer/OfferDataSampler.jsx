import React from 'react'
import OfferCardSampler from './OfferCardSampler'

const productData = [
  {
    id: 1,
    image: `https://picsum.photos/seed/${Math.random()}/150`,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 5 days',
    status: 'Offer accepted',
  },
  {
    id: 2,
    image: `https://picsum.photos/seed/${Math.random()}/151`,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 4 days',
    status: 'Offer accepted',
  },
  {
    id: 3,
    image: `https://picsum.photos/seed/${Math.random()}/152`,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 3 days',
    status: 'Offer accepted',
  },
  {
    id: 4,
    image: `https://picsum.photos/seed/${Math.random()}/153`,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 2 days',
    status: 'Offer accepted',
  },
  {
    id: 5,
    image: `https://picsum.photos/seed/${Math.random()}/154`,
    title: 'Mini Portable Refillable Spray...',
    description: 'We are a factory direct sales store...',
    rewards: 5,
    due: '- 1 days',
    status: 'Offer accepted',
  },
]
const OfferDataSampler = () => {
  return (
    <div className="">
      <div className="mt-14 mb-2 text-xl font-semibold">Offers</div>
      <div className="flex  ">
        {productData &&
          productData.length > 0 &&
          productData.map((product) => (
            <OfferCardSampler key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default OfferDataSampler
