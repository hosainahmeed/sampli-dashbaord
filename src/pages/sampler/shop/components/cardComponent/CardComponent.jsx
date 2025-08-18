import { Card } from 'antd'
import React from 'react'
import toast from 'react-hot-toast'
import { CiHeart } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
const { Meta } = Card
const CardComponent = ({ item }) => {
  const navigate = useNavigate()
  return (
    <Card
      className=" border  border-gray-200 w-full max-w-[250px] rounded-lg overflow-hidden h-[400px]"
      cover={
        <div>
          <CiHeart
            onClick={() => toast.success('Product added to wishlist')}
            className="cursor-pointer absolute top-2 right-2 text-4xl font-bold hover:text-red-500 "
          />
          <img
            className="w-full h-[230px]  object-cover object-center"
            alt={item.title}
            src={item.image}
          />
        </div>
      }
    >
      <Meta
        onClick={() => {
          navigate(`/sampler/shop/${item.title}/${item.id}`)
        }}
        className="cursor-pointer"
        title={item.title}
        description={
          <div className="flex justify-between flex-col  h-[100px]">
            <div className="text-sm text-gray-600">{item.description}</div>
            <div className="flex gap-3 items-center mt-2 text-[18px] ">
              <span className=" font-semibold text-black">
                {item.price}
              </span>
              <span className="text-gray-500 line-through ">
                {item.originalPrice}
              </span>
            </div>
          </div>
        }
      />
    </Card>
  )
}

export default CardComponent
