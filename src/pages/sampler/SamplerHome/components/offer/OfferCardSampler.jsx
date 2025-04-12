import React, { useState } from 'react'
import ProductDetails from './ProductDetails'
import { Button } from 'antd'

const OfferCardSampler = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className="w-full  bg-white  rounded-md shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* Product Image */}
      <div className=" flex justify-center w-full">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-32 object-contain object-center"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 border-t border-gray-100">
        <h3 className="text-sm font-semibold truncate">{product.title}</h3>
        <p className="text-gray-500 text-xs truncate">{product.description}</p>

        {/* Rewards & Due */}
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-700">
            <span className="text-gray-500 ">Rewards:</span>{' '}
            <span className="text-black">${product.rewards}</span>
          </span>
          <span className="text-gray-700">
            <span className="text-gray-500 ">Due:</span>{' '}
            <span className="text-black">{product.due}</span>
          </span>
        </div>
      </div>

      {/* Offer Status Button */}
      <div className=" cursor-pointer p-2">
        <Button
          onClick={showModal}
          className={` !w-full !cursor-pointer !font-medium !text-sm !py-4 ${
            product.status === 'Offer Accepted'
              ? '!text-blue-600 !bg-blue-100'
              : product.status === 'Offer Expired'
              ? '!text-red-600 !bg-red-100'
              : '!text-white !bg-blue-500'
          }`}
        >
          {product.status}
        </Button>
        <ProductDetails visible={isModalVisible} onCancel={handleCancel} />
      </div>
    </div>
  )
}

export default OfferCardSampler
