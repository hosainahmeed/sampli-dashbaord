import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import productImage from '/public/product_image.svg'

const SoloStoveCart = () => {
  const [cart, setCart] = useState([
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
  ])

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const grandTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <div className="responsive-width h-screen !mt-5 !mb-32 text-gray-500 overflow-auto scroll-y-auto scrollbar-none">
      <div className="text-2xl !text-black font-bold mb-5">Cart Items</div>
      {cart.length > 0 ? (
        <div>
          <div className="border-b pb-2 mb-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 font-medium">Item</div>
              <div className="col-span-2 font-medium text-center">Price</div>
              <div className="col-span-2 font-medium text-center">Quantity</div>
              <div className="col-span-2 font-medium text-right">Total</div>
            </div>
          </div>

          <div>
            {cart.map((item) => (
              <div key={item.id} className="border-b border-gray-200 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 mr-4 object-contain"
                    />
                    <div>
                      <div className="font-medium mt-2">{item.name}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    {item.price > 0 ? (
                      <div className="flex items-center border rounded">
                        <button
                          className="px-2 py-1 border-r"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          −
                        </button>
                        <div className="px-3">{item.quantity}</div>
                        <button
                          className="px-2 py-1 border-l"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <div className="h-1 w-12 bg-gray-300"></div>
                    )}
                  </div>
                  <div className="col-span-2 text-right flex justify-end items-center">
                    <div className="mr-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-2">
            <div className="flex justify-between py-2 ">
              <div className="font-bold">Grand total:</div>
              <div className="text-2xl !text-black font-bold">{grandTotal}</div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => toast.success('Checkout Successfully!')}
              className="w-full bg-white !text-black !border !border-gray-200  transition-all   hover:!bg-black  cursor-pointer hover:!text-white py-3 font-medium"
            >
              Check out
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-96">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <span className="text-5xl">🛒</span>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">0</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>

            <div className="w-16 h-1 bg-orange-500 mx-auto mb-6"></div>

            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
          </div>

          <Link to={'/sampler/shop'} className="cursor-pointer">
            <button className="bg-green-200 cursor-pointer hover:bg-green-300 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default SoloStoveCart
