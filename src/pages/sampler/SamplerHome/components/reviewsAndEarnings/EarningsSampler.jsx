import React from 'react'
import { BiSolidOffer } from 'react-icons/bi'
import { PiCodesandboxLogoBold } from 'react-icons/pi'
import ReviewsAndEarningsSampler from './ReviewsAndEarningsSampler'

const EarningsSampler = () => {
  return (
    <div className="responsive-width">
      <div>
        <div className="text-3xl  font-semibold mb-10">Earnings</div>

        <div className="flex justify-between items-center ">
          <div>
            Total Balance:{' '}
            <span className="text-blue-500 text-xl font-bold">$ 0.00</span>
          </div>

          <div className="flex items-center gap-5">
            <button className="!text-blue-500 hover:!text-blue-400 cursor-pointer">
              Transaction History
            </button>

            <button className="bg-blue-500 cursor-pointer !text-white px-4 py-3 rounded-lg hover:bg-blue-600">
              + Add withdrawal method
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div className="flex flex-col  justify-between bg-white border border-gray-100 shadow-md rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <PiCodesandboxLogoBold className="text-yellow-800 text-2xl" />
              <span className="text-lg font-semibold">Review rewards</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">$0.00</div>
              <div className="text-gray-500 text-sm">Pending: $0.00</div>
            </div>
          </div>

          <div className="flex flex-col  justify-between bg-white border border-gray-100 shadow-md rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <BiSolidOffer className="text-green-400 text-2xl" />
              <span className="text-lg font-semibold">Sales Commissions</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">$0.00</div>
              <div className="text-gray-500 text-sm">Pending: $0.00</div>
            </div>
          </div>
        </div>
        <ReviewsAndEarningsSampler />
      </div>
    </div>
  )
}

export default EarningsSampler
