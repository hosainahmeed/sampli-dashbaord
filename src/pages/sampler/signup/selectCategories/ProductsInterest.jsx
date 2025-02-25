import { Checkbox } from 'antd'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ProductsInterest = ({ prev, next }) => {
  const [selectedInterests, setSelectedInterests] = useState([])

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setSelectedInterests((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    )
  }
  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest before proceeding.')
      return
    }
    console.log('Selected Review Platforms:', selectedInterests)
    next()
  }
  return (
    <div>
      <p className="pb-5 text-2xl text-center font-semibold">
        What products interest you?
      </p>
      <div className="flex flex-col justify-between  h-[425px]">
        <div className="grid grid-cols-2 gap-4">
          {[
            'Tech & Electronics',
            'Home & Kitchen',
            'Fashion & Accessories',
            'Food & Beverages',
            'Beauty & Cosmetics',
            'Sports & Fitness',
          ].map((item) => (
            <div
              key={item}
              className="p-5 border border-gray-500 cursor-pointer"
            >
              <Checkbox value={item} onChange={handleCheckboxChange} />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={prev}
            className=" flex justify-end  cursor-pointer hover:!text-blue-500"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className=" flex justify-end cursor-pointer hover:!text-blue-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductsInterest
