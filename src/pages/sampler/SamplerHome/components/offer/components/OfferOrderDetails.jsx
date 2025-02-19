import React, { useState } from 'react'
import { Steps, Button, Modal, Rate } from 'antd'
import { ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const { Step } = Steps

const OfferOrderDetails = ({ setIsClicked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
    toast.success('Order cancelled successfully!')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="pb-10">
      <div
        className="text-gray-500 flex gap-1    cursor-pointer mt-1 mb-5 hover:text-gray-600"
        onClick={() => setIsClicked(false)}
      >
        <MdArrowBack />
        Back
      </div>
      <div className="max-w-4xl p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div>
          <div className="grid grid-cols-3   gap-3">
            <div className="text-sm text-gray-500">
              <strong className="text-black">Order date</strong>
              <div className="mt-1"> Mar 23, 2024</div>
            </div>
            <div className="text-sm text-gray-500">
              <strong className="text-black">Order no</strong>
              <div className="mt-1">477368782</div>
            </div>
            <div>
              <strong className="text-black text-sm">Status</strong>
              <div>
                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                  In progress
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="text-sm text-gray-500">
              <strong className="text-black">Reward</strong>
              <div className="mt-1"> $5.00</div>
            </div>
            <div className="text-sm text-gray-500">
              <strong className="text-black">Category</strong>
              <div className="mt-1">Electronics</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-start justify-between">
          <div className="flex gap-2">
            <img
              src={`https://picsum.photos/seed/${Math.random()}/200`}
              alt="Product"
              className="w-24 h-24 object-cover"
            />
            <div>
              <h3 className="text-md font-semibold !mb-4">
                BENGOO G9000 Stereo Gaming Headset
              </h3>
              <p className="text-sm text-gray-500">
                Qty: <strong className="text-black">1</strong>
              </p>
              <p className="text-sm text-gray-500">
                Total: <strong className="text-black">$5.00</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <button className="border text-nowrap !text-[14px] hover:bg-gray-100 cursor-pointer border-blue-500 px-3 py-1 !text-blue-500 rounded-md">
                Track Item
              </button>
              <Button
                className="!bg-blue-500 hover:!text-black"
                onClick={showModal}
              >
                Upload Review
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold">Order History</h4>
          <Steps current={1} direction="vertical" className="mt-4">
            <Step
              title="Order reviewing"
              description="23, Oct 2023"
              icon={<ShoppingCartOutlined />}
            />
            <Step
              title="Processing order"
              description="Pending"
              icon={<CheckCircleOutlined />}
            />
            <Step
              title="Item shipped"
              description="Pending"
              icon={<CheckCircleOutlined />}
            />
            <Step
              title="Delivered"
              description="Pending"
              icon={<CheckCircleOutlined />}
            />
          </Steps>
        </div>

        <h4 className="font-semibold text-xl !mb-5 ">Shipping Information</h4>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h5 className="font-medium">Contact Information</h5>
            <p className="text-sm text-gray-500">Micheal@gmail.com</p>
            <p className="text-sm text-gray-500">+123 456 7890</p>
          </div>
          <div>
            <h5 className="font-xl">Shipping Address</h5>
            <p className="text-sm text-gray-500">Maurice Swift</p>
            <p className="text-sm text-gray-500">
              36 Moses A Ebitu road, SPG LEKKI-AGUNGI, Lagos
            </p>
          </div>
          <div>
            <h5 className="font-xl">Shipping Method</h5>
            <p className="text-sm text-gray-500">Door Delivery</p>
          </div>
        </div>
      </div>

      <Modal
        title=<div className="text-center text-xl">Submit review</div>
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        okText="Yes, cancel"
        cancelText="No, don't cancel"
      >
        <p>Your Review Awaits</p>
        <p className="text-gray-500 text-[14px]">
          Your review helps others make informed decisions and improves the
          product. Please share your honest opinion.
        </p>
        <p>Rating</p>
        <div className="">
          <Rate allowHalf defaultValue={0} size={20} />
        </div>

        <div>Upload Video</div>

        <textarea
          name="text"
          id="text"
          cols="30"
          rows="5"
          className="p-5 w-full border outline-none border-gray-200 rounded-3xl"
        ></textarea>
      </Modal>
    </div>
  )
}

export default OfferOrderDetails
