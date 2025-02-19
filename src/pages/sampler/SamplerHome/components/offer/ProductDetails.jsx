import React, { useState, useRef } from 'react'
import { Modal, Button, Descriptions, Carousel } from 'antd'

const ProductDetails = ({ visible, onCancel }) => {
  // Create array of images for the carousel
  const images = Array.from({ length: 5 }, (_, index) => ({
    src: `https://picsum.photos/seed/${Math.random()}/300`,
    alt: `Product Image ${index + 1}`,
  }))

  const [activeIndex, setActiveIndex] = useState(0)
  const mainCarouselRef = useRef(null)

  const onChange = (currentSlide) => {
    console.log(currentSlide)
    setActiveIndex(currentSlide)
  }

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: onChange,
    arrows: true,
  }

  const handleThumbnailClick = (index) => {
    if (mainCarouselRef.current) {
      mainCarouselRef.current.goTo(index)
      setActiveIndex(index)
    }
  }

  return (
    <Modal
      title="Offer details"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      className="rounded-lg overflow-y-auto h-screen max-h-screen scrollbar-none"
      centered
    >
      <div className="flex flex-col items-center mt-10">
        <div className="w-full mb-4">
          <Carousel ref={mainCarouselRef} {...carouselSettings}>
            {images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-64"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="max-h-full max-w-full object-contain mx-auto"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Thumbnail Preview Row */}
        <div className="flex justify-center gap-2 mb-6 overflow-x-auto w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer p-1 rounded transition-all ${
                activeIndex === index
                  ? 'border-2 border-blue-500'
                  : 'border-2 border-transparent'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className="h-16 w-16 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Product Description */}
        <h2 className="text-2xl font-semibold">
          BENGOO G9000 Stereo Gaming Headset
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          High-quality wireless headphones with noise cancellation
        </p>

        {/* Product Details */}
        <div className="w-full mt-4">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Manufacturer's name">
              Premium Wash towel
            </Descriptions.Item>
            <Descriptions.Item label="Product Number">#12763</Descriptions.Item>
            <Descriptions.Item label="E.T.A">2 Days</Descriptions.Item>
            <Descriptions.Item label="Shipping from">
              Area 59, Delaware, USA
            </Descriptions.Item>
            <Descriptions.Item label="Rewards">$5.00</Descriptions.Item>
            <Descriptions.Item label="Quantity">2 Bottles</Descriptions.Item>
          </Descriptions>
        </div>

        {/* Instructions */}
        <div className="w-full mt-4">
          <h4 className="font-medium">Instructions on how to use product</h4>
          <div className="overflow-y-auto h-40 scrollbar-none">
            <ul className="list-disc pl-6 mt-2">
              <li>
                TrustRadius is a similar product review platform to G2 Crowd as
                it's also targeted toward B2B software businesses.
              </li>
              <li>
                TrustRadius is a similar product review platform to G2 Crowd as
                it's also targeted toward B2B software businesses.
              </li>
              <li>
                TrustRadius is a similar product review platform to G2 Crowd as
                it's also targeted toward B2B software businesses.
              </li>
              <li>
                TrustRadius is a similar product review platform to G2 Crowd as
                it's also targeted toward B2B software businesses.
              </li>
              <li>
                TrustRadius is a similar product review platform to G2 Crowd as
                it's also targeted toward B2B software businesses.
              </li>
            </ul>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between w-full gap-5 mt-6">
          <Button
            type="default"
            onClick={onCancel}
            className="py-2 border-gray-300"
          >
            Reject Offer
          </Button>
          <Button type="primary" className="w-full py-2">
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ProductDetails
