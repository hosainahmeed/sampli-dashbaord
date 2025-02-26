import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const SoloStoveCart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Pi Pizza Oven',
      details: '(Estimated Ship Date: June 6th)',
      note: 'Fuel Source: Wood Only',
      quantity: 1,
      price: 100,
      img: `https://picsum.photos/seed/${Math.random() * 1000}/60/60`,
    },
    {
      id: 2,
      name: 'Grill Ultimate Bundle',
      details: 'Add accident protection for $29.99',
      note: '',
      quantity: 1,
      price: 200.5,
      img: `https://picsum.photos/seed/${Math.random() * 1000}/60/60`,
    },
    {
      id: 3,
      name: 'Starters',
      details: '(4 pack)',
      note: '',
      quantity: 1,
      price: 10.55,
      img: `https://picsum.photos/seed/${Math.random() * 1000}/60/60`,
    },
    {
      id: 4,
      name: 'Charcoal Grill Pack',
      details: '',
      note: '',
      quantity: 1,
      price: 1.5,
      img: `https://picsum.photos/seed/${Math.random() * 1000}/60/60`,
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
                      {item.id === 1 && (
                        <div className="font-medium">Pi Pizza Oven</div>
                      )}
                      {item.id === 2 && (
                        <>
                          <div className="text-sm text-gray-600">
                            Solo Stove
                          </div>
                          <div className="font-medium">
                            Grill Ultimate Bundle
                          </div>
                        </>
                      )}
                      {item.id === 3 && (
                        <>
                          <div className="text-sm text-gray-600">
                            Solo Stove
                          </div>
                          <div className="font-medium">Starters</div>
                        </>
                      )}
                      {item.id === 4 && (
                        <>
                          <div className="text-sm text-gray-600">
                            Solo Stove
                          </div>
                          <div className="font-medium">Charcoal Grill Pack</div>
                        </>
                      )}
                      {item.details && (
                        <div className="text-orange-500">{item.details}</div>
                      )}
                      {item.note && <div className="text-sm">{item.note}</div>}
                      {item.id === 1 && (
                        <div className="text-blue-500 text-sm mt-1">Change</div>
                      )}
                      {item.id === 2 && (
                        <div className="text-xs bg-orange-100 text-orange-800 p-1 mt-1 inline-block">
                          Add accident protection for $29.99
                        </div>
                      )}
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
              className="w-full bg-white !text-black !border transition-all   hover:!bg-black  cursor-pointer hover:!text-white py-3 font-medium"
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
              Looks like you havent added any items to your cart yet.
            </p>

            <div className="flex justify-center mb-4 space-x-4">
              <div className="p-4 border border-gray-200 rounded-lg w-24 h-24 flex items-center justify-center bg-gray-50">
                <span className="text-4xl">🔥</span>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg w-24 h-24 flex items-center justify-center bg-gray-50">
                <span className="text-4xl">🍕</span>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg w-24 h-24 flex items-center justify-center bg-gray-50">
                <span className="text-4xl">🥩</span>
              </div>
            </div>
          </div>

          <Link to={'/sampler/shop'}>
            <button className="bg-green-200 hover:bg-green-300 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default SoloStoveCart
