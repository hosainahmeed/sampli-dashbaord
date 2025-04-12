import React from 'react'
import { LuShoppingCart } from 'react-icons/lu'
import productImage from '/public/product_image.svg'

const cart = [
  {
    id: 1,
    name: 'Pi Pizza Oven',
    quantity: 1,
    price: 100,
    img: productImage,
  },
  {
    id: 2,
    name: 'Grill Ultimate Bundle',
    quantity: 1,
    price: 200.5,
    img: productImage,
  },
  {
    id: 3,
    name: 'Starters',
    quantity: 1,
    price: 10.55,
    img: productImage,
  },
  {
    id: 4,
    name: 'Charcoal Grill Pack',
    quantity: 1,
    price: 1.5,
    img: productImage,
  },
]
const ShoppingCartSampler = () => {
  return (
    <div className="relative">
      <LuShoppingCart className="hover:text-black text-gray-500 transition-all" />
      {cart.length > 0 && (
        <div className="absolute -top-1 left-3 bg-red-500 rounded-full text-white !text-[12px]  w-4 h-4 flex items-center justify-center">
          {cart.length}
        </div>
      )}
    </div>
  )
}

export default ShoppingCartSampler
