import React, { useState } from 'react'
import {
  Button,
  Steps,
  Radio,
  Form,
  notification,
  Select,
  Card,
  Divider,
} from 'antd'
import { Option } from 'antd/es/mentions'
import { Link } from 'react-router-dom'

const { Step } = Steps

const ReturnItemsSampler = () => {
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [returnMethod, setReturnMethod] = useState('post')
  const [reason, setReason] = useState('Too small')
  const [confirmation, setConfirmation] = useState(false)

  const onNext = () => {
    if (current === 0) {
      setCurrent(1)
    } else if (current === 1) {
      setCurrent(2)
    }
  }

  const onBack = () => {
    if (current === 2) {
      setCurrent(1)
    } else if (current === 1) {
      setCurrent(0)
    }
  }

  const onSubmit = () => {
    setConfirmation(true)
    notification.success({
      message: 'Return Processed',
      description: 'A confirmation email has been sent.',
    })
  }
  const [method, setMethod] = useState('post')
  const [returnCost, setReturnCost] = useState('Free')

  const handleMethodChange = (e) => {
    const selectedMethod = e.target.value
    setMethod(selectedMethod)
    setReturnCost(selectedMethod === 'post' ? 'Free' : 'From $6.00')
  }
  return (
    <div className="responsive-width">
      <div className="text-2xl font-semibold mb-5">Return item</div>
      <div>
        {/* Steps Component */}
        <Steps current={current} className="mb-8" size="small">
          <Step title="Item to return" />
          <Step title="Return method" />
          <Step title="Return created" />
        </Steps>

        {/* Step 1: Item to Return */}
        {current === 0 && (
          <div className="mt-10 ">
            <h2 className=" font-semibold !mb-5">
              Tick the item you want to return and select the reason(s) for
              return
            </h2>

            <Card
              headStyle={{ paddingInline: '10px', paddingBottom: '10px' }}
              title={
                <div className="flex !-px-2 justify-between">
                  <div className="flex gap-2 rounded-lg ">
                    <div className=" rounded-xl overflow-hidden ">
                      <img
                        src={`https://randomuser.me/api/portraits/men/${Math.floor(
                          Math.random() * 100
                        )}.jpg`}
                        alt="Item"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[14px]">
                      <h3 className="font-semibold ">
                        BENGOO G9000 Stereo Gaming Headset
                      </h3>
                      <p className="!mt-4">
                        <span className="text-gray-500">Qty:</span> 1
                      </p>
                      <p>
                        <span className="text-gray-500">Total:</span> $5.00
                      </p>
                    </div>
                  </div>
                  <div className=" text-[14px] ">
                    <div>
                      <strong className="text-black ">35 days</strong> left to
                      return
                    </div>
                    <div className=" mt-2 font-medium text-gray-500">
                      Reason for return
                    </div>
                    <div>
                      {' '}
                      <Form.Item
                        name="reason"
                        initialValue={reason}
                        className="!mt-2 "
                      >
                        <Select
                          placeholder="Select reason for return"
                          onChange={(value) => setReason(value)}
                        >
                          <Option value="Too small">Too small</Option>
                          <Option value="Damaged">Damaged</Option>
                          <Option value="Wrong item">Wrong item</Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              }
              variant="borderless"
              style={{
                width: '100%',
              }}
              className="!py-2 "
            >
              <div>
                <strong>Please note:</strong> Items must be returned unused and
                in their original condition, with all labels and tags still
                attached. Please ensure that the products do not contain any
                personal data. For more details, refer to our{' '}
                <Link to={'/'}>
                  <strong className="underline">return policy</strong>
                </Link>
              </div>
            </Card>

            <div className="!mt-4 !flex !justify-end ">
              <Button type="primary" onClick={onNext}>
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Return Method */}
        {current === 1 && (
          <>
            <h2 className=" font-semibold  !mt-10 !mb-5">
              Choose a return method
            </h2>
            <div className="  p-8 bg-white rounded-2xl border border-gray-200">
              <div className="grid grid-cols-2 gap-5 mt-6">
                {/* Left Panel */}
                <div className="rounded-lg ">
                  <div className=" flex flex-col border border-gray-200 px-4 py-5 rounded-2xl  ">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex gap-3">
                        <input
                          type="radio"
                          value="post"
                          checked={method === 'post'}
                          onChange={handleMethodChange}
                          className="mr-2 cursor-pointer"
                        />
                        <label className="text-sm">
                          <div>By post </div>
                          <div className="text-gray-500">
                            Package and drop off your return
                          </div>
                        </label>
                      </div>
                      <div className="text-green-400">Free</div>
                    </div>
                    <Divider type="horizontal" />
                    <div className="flex items-center justify-between mt-2 gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="radio"
                          value="pickup"
                          checked={method === 'pickup'}
                          onChange={handleMethodChange}
                          className="mr-2 cursor-pointer"
                        />
                        <label className="text-sm">
                          <div>Schedule pick up</div>
                          <div className="text-gray-500">
                            Organize a pickup at your location
                          </div>
                        </label>
                      </div>

                      <div className="text-gray-600">From $6.00</div>
                    </div>
                  </div>
                </div>

                {/* Right Panel */}
                <div className=" p-6 rounded-lg  border border-gray-200">
                  <h4 className="font-semibold">You're returning:</h4>
                  <p className="text-gray-500">1 item(s)</p>
                  <Divider type="horizontal" />
                  <div className="mt-4">
                    <h4 className="font-semibold">Estimated return value:</h4>
                    <p className="text-gray-500">Master card ***5637: $40.00</p>
                  </div>
                  <Divider type="horizontal" />

                  <div className="mt-4">
                    <h4 className="font-semibold">Summary of returns:</h4>
                    <p className="text-gray-500">Return cost: {returnCost}</p>
                  </div>
                  <div className="mt-6 flex gap-3 flex-col">
                    <button
                      onClick={onNext}
                      className="w-full py-2 cursor-pointer bg-blue-500 !text-white rounded-lg hover:bg-blue-400"
                    >
                      Create return
                    </button>
                    <button
                      className="w-full cursor-pointer py-2 mt-2  text-gray-700 rounded-lg hover:bg-gray-200"
                      onClick={onBack}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Return Created */}
        {current === 2 && (
          <>
            <h2 className=" font-semibold  !mt-10 !mb-5">Create return</h2>
            <div className="  p-8 bg-white rounded-2xl border border-gray-200">
              <div className="grid grid-cols-2 gap-5 mt-6">
                {/* Left Panel */}
                <div>
                  <Card
                    title={
                      <div className="text-center pt-10">
                        <div className="text-xl font-bold">You are all set</div>
                        <p className="text-gray-500 text-[14px]">
                          A confirmation email has been sent to
                          Micheal@gmail.com
                        </p>
                        <p>How to get your item back to us</p>
                        <p className='text-wrap text-[14px] text-gray-500 '>
                          We need to recieve your item(s) to process the return.
                          Then we'll issue a refund, which usually takes 3-5
                          business days to post.
                        </p>
                      </div>
                    }
                    variant="borderless"
                    style={{
                      width: '100%',
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex gap-3">
                        <input
                          type="radio"
                          value="post"
                          className="mr-2 cursor-pointer"
                        />
                        <label className="text-sm">
                          <div>Schedule pick up </div>
                          <div className="text-gray-500">
                            Organize a pickup at your location
                          </div>
                        </label>
                      </div>
                      <div className="text-gray-500">From $6.00</div>
                    </div>
                  </Card>
                </div>

                {/* Right Panel */}
                <div className=" p-6 rounded-lg  border border-gray-200">
                  <h4 className="font-semibold">You're returning:</h4>
                  <p className="text-gray-500">1 item(s)</p>
                  <Divider type="horizontal" />
                  <div className="mt-4">
                    <h4 className="font-semibold">Estimated return value:</h4>
                    <p className="text-gray-500">Master card ***5637: $40.00</p>
                  </div>
                  <Divider type="horizontal" />

                  <div className="mt-4">
                    <h4 className="font-semibold">Summary of returns:</h4>
                    <p className="text-gray-500">Return cost: {returnCost}</p>
                  </div>
                  <div className="mt-6 flex gap-3 flex-col">
                    <button className="w-full py-2 cursor-pointer bg-blue-500 !text-white rounded-lg hover:bg-blue-400">
                      Create return
                    </button>
                    <button
                      className="w-full cursor-pointer py-2 mt-2  text-gray-700 rounded-lg hover:bg-gray-200"
                      onClick={onBack}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ReturnItemsSampler
