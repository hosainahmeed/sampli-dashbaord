import React, { useRef } from 'react'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const categories = [
  { id: 1, name: 'Beauty', img: 'https://picsum.photos/200' },
  { id: 2, name: 'Apparel', img: 'https://picsum.photos/300' },
  { id: 3, name: 'Footwear', img: 'https://picsum.photos/400' },
  { id: 4, name: 'Personal Care', img: 'https://picsum.photos/500' },
  { id: 5, name: 'Home appliances', img: 'https://picsum.photos/600' },
  { id: 6, name: 'Food & Beverage', img: 'https://picsum.photos/700' },
]
const CategoryCarousel = () => {
  const carouselRef = useRef(null)

  return (
    <div className=" my-8 relative">
      <h2 className="text-xl font-semibold mb-4 p-2">Shop by Category</h2>

      <button
        className="absolute left-0 top-1/2 transform cursor-pointer -translate-y-1/2 bg-gray-900  text-white p-3 !mt-5 rounded-full shadow-md hover:bg-gray-700 transition z-10"
        onClick={() => carouselRef.current.prev()}
      >
        <LeftOutlined className="!text-white" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-900 text-white p-3 !mt-5 rounded-full shadow-md hover:bg-gray-700 transition z-10"
        onClick={() => carouselRef.current.next()}
      >
        <RightOutlined className="!text-white" />
      </button>

      <Carousel
        ref={carouselRef}
        dots={false}
        slidesToShow={5}
        slidesToScroll={2}
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ]}
      >
        {categories.map((category, index) => (
          <Link
            to={`/sampler/shop/${category.name}`}
            key={index}
            className="p-2"
          >
            <div className="flex flex-col items-center  justify-center p-4 rounded-lg  cursor-pointer hover:shadow-lg transition">
              <img
                src={category.img}
                alt={category.name}
                className="w-28 h-28 rounded-full object-cover mb-2"
              />
              <p className="text-sm font-medium">{category.name}</p>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
