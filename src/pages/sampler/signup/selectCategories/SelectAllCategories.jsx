import React, { useState } from 'react'
import { Steps } from 'antd'

import AllCategories from './AllCategories'
import ProductsInterest from './ProductsInterest'
import ReviewPlatforms from './ReviewPlatforms'
import ContactAndShippingInformation from './ContactAndShippingInformation'
import AddYourSocials from './AddYourSocials'
import AddProfileDetails from './AddProfileDetails'

const { Step } = Steps

const SelectAllCategories = () => {
  const [current, setCurrent] = useState(0)
  const next = () => setCurrent((prev) => prev + 1)
  const prev = () => setCurrent((prev) => prev - 1)

  const steps = [
    // Step 1 All Categories
    {
      title: 'All Categories',
      content: <AllCategories next={next} />,
    },

    // Step 2 Products Interest
    {
      title: 'Products Interest',
      content: <ProductsInterest prev={prev} next={next} />,
    },

    // Step 3 Review Platforms
    {
      title: 'Review Platforms',
      content: <ReviewPlatforms prev={prev} next={next} />,
    },

    // Step 4 Contact & Shipping Information
    {
      title: 'Information',
      content: <ContactAndShippingInformation prev={prev} next={next} />,
    },

    //Step 5  Add profile details
    {
      title: 'Add Profile Details',
      content: <AddProfileDetails prev={prev} next={next} />,
    },

    // Step 6  Add your socials
    {
      title: 'Add Your Socials',
      content: <AddYourSocials prev={prev} />,
    },
  ]

  return (
    <div>
      <div className="responsive-width  flex items-center justify-center h-screen ">
        <div className="p-6 border  border-gray-200 h-auto bg-gray-200/50 rounded-lg w-full flex flex-col">
          <Steps current={current} className="mb-6">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} />
            ))}
          </Steps>

          <div className="flex-grow mt-14 px-10">
            {current !== steps.length - 1 && current !== steps.length - 2 && (
              <div
                className="text-end text-blue-600 -mb-6 cursor-pointer hover:text-blue-400"
                onClick={next}
              >
                Skip
              </div>
            )}
            {steps[current].content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectAllCategories
