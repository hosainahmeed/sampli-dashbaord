import React, { useRef } from 'react'
import { Card, Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { CiHeart } from 'react-icons/ci'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card

const items = [
  {
    id: 1,
    image: 'https://picsum.photos/100',
    title: 'BENGOO G9000 Stereo Gaming Headset',
    description: 'High-quality wireless headphones with noise cancellation',
    price: '$5.00',
    originalPrice: '$4.00',
  },
  {
    id: 2,
    image: 'https://picsum.photos/600',
    title: 'Mini Portable Refillable Sprayer Atomizer Bottle 5ml',
    description: 'Compact and portable sprayer for your favorite fragrance',
    price: '$3.00',
    originalPrice: '$2.50',
  },
  {
    id: 3,
    image: 'https://picsum.photos/200',
    title: 'Ox 18 Inches Standing Plus Fan',
    description: 'Powerful fan to keep you cool during hot days',
    price: '$10.00',
    originalPrice: '$8.00',
  },
  {
    id: 4,
    image: 'https://picsum.photos/900',
    title: 'Gaming Headset',
    description: 'Immersive sound experience for gamers',
    price: '$7.00',
    originalPrice: '$5.50',
  },
  {
    id: 5,
    image: 'https://picsum.photos/620',
    title: 'Portable Speaker',
    description: 'Compact speaker with high-quality sound',
    price: '$15.00',
    originalPrice: '$12.00',
  },
  {
    id: 6,
    image: 'https://picsum.photos/720',
    title: 'Smartwatch',
    description: 'Feature-rich smartwatch with multiple health tracking',
    price: '$25.00',
    originalPrice: '$20.00',
  },
  {
    id: 7,
    image: 'https://picsum.photos/820',
    title: 'Wireless Bluetooth Earbuds',
    description: 'Comfortable earbuds with superior sound quality',
    price: '$30.00',
    originalPrice: '$25.00',
  },
  {
    id: 8,
    image: 'https://picsum.photos/920',
    title: 'Digital Camera',
    description: 'Capture high-resolution photos and videos',
    price: '$200.00',
    originalPrice: '$180.00',
  },
]

function BestSellers() {
  const carouselRef = useRef(null)

  return (
    <div className=" px-4  mt-24 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Best Sellers</h2>
      </div>

      <button
        className="absolute left-0 top-1/2 transform cursor-pointer -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition z-10"
        onClick={() => carouselRef.current.prev()}
      >
        <LeftOutlined className="!text-white" />
      </button>

      <button
        className="absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition z-10"
        onClick={() => carouselRef.current.next()}
      >
        <RightOutlined className="!text-white" />
      </button>

      <Carousel
        ref={carouselRef}
        dots={false}
        slidesToShow={4}
        slidesToScroll={2}
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } },
        ]}
      >
        {items.map((item, index) => (
          <CardComponent key={index} item={item} />
        ))}
      </Carousel>
    </div>
  )
}

export default BestSellers

const CardComponent = ({ item }) => {
  const navigate = useNavigate()
  return (
    <Card 
      className=" border  cursor-pointer border-gray-200 w-full max-w-[250px] rounded-lg overflow-hidden h-[400px]"
      onClick={() => {
        navigate(`/sampler/shop/${item.title}/${item.id}`)
      }}
      cover={
        <div>
          <CiHeart
            onClick={() => toast.success('Product added to wishlist')}
            className="cursor-pointer absolute top-2 right-2 text-4xl font-bold hover:text-red-500 "
          />
          <img
            className="w-full h-[230px]   object-cover object-center"
            alt={item.title}
            src={item.image}
          />
        </div>
      }
    >
      <Meta
        title={item.title}
        description={
          <div className="flex justify-between flex-col  h-[100px]">
            <div className="text-sm text-gray-600">{item.description}</div>
            <div className="flex justify-between items-center mt-2 ">
              <span className="text-xl font-semibold ">{item.price}</span>
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
