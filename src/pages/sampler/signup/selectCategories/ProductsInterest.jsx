import { Checkbox } from 'antd'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useCategorySectionApisQuery } from '../../../../Redux/sampler/categoryApis'
import Loader from '../../../loader/Loader'
import { useAddInterestedCategoryReviewerMutation } from '../../../../Redux/sampler/authSectionApis'

const ProductsInterest = ({ prev, next }) => {
  const [selectedInterests, setSelectedInterests] = useState([])
  const { data: getAllCategory, isLoading } = useCategorySectionApisQuery()
  const [addInterestedCategory, { isLoading: interestedLoading }] =
    useAddInterestedCategoryReviewerMutation()
  console.log(getAllCategory?.data)
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setSelectedInterests((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    )
  }
  const handleSubmit = async () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest before proceeding.')
      return
    }
    try {
      const res = await addInterestedCategory({
        interestedCategory: selectedInterests,
      }).unwrap()
      if (res.success) {
        toast.success(res.message)
        next()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(
        error?.data?.message || 'Something went wrong. Please try again.'
      )
    }
  }

  return (
    <div>
      <p className="pb-5 text-2xl text-center font-semibold">
        What products interest you?
      </p>
      <div className="flex flex-col justify-between  h-[425px]">
        <div>{isLoading && <Loader />}</div>
        <div className="grid grid-cols-2 gap-4 -mt-20">
          {getAllCategory?.data?.map((item) => (
            <div
              key={item}
              className="p-5 border border-gray-500 cursor-pointer"
            >
              <Checkbox value={item?._id} onChange={handleCheckboxChange} />
              <span className="ml-2">{item?.name}</span>
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
            {interestedLoading ? 'Loading...' : ' Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductsInterest
