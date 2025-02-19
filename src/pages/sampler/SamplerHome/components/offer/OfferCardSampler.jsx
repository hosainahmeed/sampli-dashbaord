import React, { useState } from 'react'
import ProductDetails from './ProductDetails'

const OfferCardSampler = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className="w-full max-w-[235px] bg-white  rounded-md shadow-md overflow-hidden hover:shadow-2xl transition-shadow">
      {/* Product Image */}
      <div className=" flex justify-center w-full">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-32 object-cover object-center"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 border-t border-gray-100">
        <h3 className="text-sm font-semibold truncate">{product.title}</h3>
        <p className="text-gray-500 text-xs truncate">{product.description}</p>

        {/* Rewards & Due */}
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-700">
            <strong>Rewards:</strong>{' '}
            <span className="text-black">${product.rewards}</span>
          </span>
          <span className="text-gray-700">
            <strong>Due:</strong>{' '}
            <span className="text-black">{product.due}</span>
          </span>
        </div>
      </div>

      {/* Offer Status Button */}
      <div className="border-t border-gray-100 cursor-pointer">
        <button
          onClick={showModal}
          className={`w-full cursor-pointer font-medium text-sm py-4 ${
            product.status === 'Offer Accepted'
              ? '!text-blue-600 bg-blue-100'
              : product.status === 'Offer Expired'
              ? '!text-red-600 bg-red-100'
              : '!text-white bg-blue-500'
          }`}
        >
          {product.status}
        </button>
        <ProductDetails visible={isModalVisible} onCancel={handleCancel} />
      </div>
    </div>
  )
}

export default OfferCardSampler
