import React from 'react'
import dealmed from '../../../../../assets/worksWith/dealmed.webp'
import threem from '../../../../../assets/worksWith/3m.png'
import wel from '../../../../../assets/worksWith/wel.png'
import dukal from '../../../../../assets/worksWith/dukal.webp'
import abbott from '../../../../../assets/worksWith/abbott.png'
import dynarex from '../../../../../assets/worksWith/dynarex.png'

const images = [
  {
    id: 1,
    image: dealmed,
  },
  {
    id: 2,
    image: threem,
  },
  {
    id: 3,
    image: wel,
  },
  {
    id: 4,
    image: dukal,
  },
  {
    id: 5,
    image: abbott,
  },
  {
    id: 6,
    image: dynarex,
  },
]
const FeaturedBrands = () => {
  return (
    <div className="responsive-width">
      <div className="text-xl font-semibold mt-10 p-2">Featured brands</div>
      <div className="flex gap-2 justify-between items-center mt-5">
        {images.map((image) => (
          <div
            key={image.id}
            className=" flex items-center justify-center p-2  bg-gray-100 rounded-full h-[150px] w-[150px] "
          >
            <img
              src={image.image}
              alt={image.id}
              className="w-[100px]   mx-2  object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedBrands
