import React from 'react'
import { Modal, Button } from 'antd'
import { X } from 'lucide-react'

const AddToCartItem = ({ visible, onCancel }) => {
  const mainProduct = {
    name: 'BENGOO G9000 Stereo Gaming Headset',
    description: 'High-quality wireless headphones with noise cancellation',
    price: '$560.99',
    image: '/api/placeholder/100/100',
  }

  const recommendedProducts = Array(3).fill({
    name: 'BENGOO G9000 Stereo Gaming Headset',
    description: 'High-quality wireless headphones with noise cancellation',
    price: '$560.99',
    image: '/api/placeholder/80/80',
  })

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
      closable={false}
      className="!top-0 !right-0 !p-0"
      style={{
        position: 'absolute',
        right: 0,
        margin: 0,
        paddingBottom: 0,
      }}
    >
      <div className="p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-sm font-medium">Added To Cart</span>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Product */}
        <div className="flex gap-4 mb-6">
          <img
            src={mainProduct.image}
            alt={mainProduct.name}
            className="w-24 h-24 object-contain"
          />
          <div className="flex-1">
            <h3 className="font-medium text-sm">{mainProduct.name}</h3>
            <p className="text-xs text-gray-500">{mainProduct.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-medium">{mainProduct.price}</span>
              <div className="flex items-center border rounded">
                <button className="px-2 py-1">-</button>
                <span className="px-3 border-x">1</span>
                <button className="px-2 py-1">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="flex-1">
          <h4 className="text-sm font-medium mb-4">You may also like</h4>
          <div className="space-y-4">
            {recommendedProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1">
                  <h5 className="text-sm font-medium">{product.name}</h5>
                  <p className="text-xs text-gray-500">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium">{product.price}</span>
                    <Button type="text" className="text-blue-600">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between text-sm mb-4">
            <span>Subtotal (1 item)</span>
            <span className="font-medium">$560.99</span>
          </div>
          <Button type="primary" block className="bg-blue-600">
            Checkout
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddToCartItem
