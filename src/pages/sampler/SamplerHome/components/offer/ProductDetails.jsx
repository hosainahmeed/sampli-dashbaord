import React, { useState, useRef } from 'react'
import { Modal, Button, Descriptions, Carousel, Form, Input } from 'antd'
import toast from 'react-hot-toast'

const ProductDetails = ({ visible, onCancel }) => {
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

  const [page, setPage] = useState(1)

  const handleClick = () => {
    if (page === 2) {
      onCancel()
      toast.success('Offer Accepted!')
    } else {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <Modal
      title="Offer details"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      className="rounded-lg overflow-y-auto !h-screen !max-h-screen scrollbar-none"
      style={{
        position: 'absolute',
        top: '0',
        right: '0',
        transform: 'translateX(0)',
      }}
      centered
    >
      <div>
        {page === 1 && (
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

            <h2 className="text-2xl font-semibold">
              BENGOO G9000 Stereo Gaming Headset
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              High-quality wireless headphones with noise cancellation
            </p>

            <div className="w-full mt-4">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Manufacturer's name">
                  Premium Wash towel
                </Descriptions.Item>
                <Descriptions.Item label="Product Number">
                  #12763
                </Descriptions.Item>
                <Descriptions.Item label="E.T.A">2 Days</Descriptions.Item>
                <Descriptions.Item label="Shipping from">
                  Area 59, Delaware, USA
                </Descriptions.Item>
                <Descriptions.Item label="Rewards">$5.00</Descriptions.Item>
                <Descriptions.Item label="Quantity">
                  2 Bottles
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div className="w-full mt-4">
              <h4 className="font-medium">
                Instructions on how to use product
              </h4>
              <div className="overflow-y-auto h-40 scrollbar-none">
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    TrustRadius is a similar product review platform to G2 Crowd
                    as it's also targeted toward B2B software businesses.
                  </li>
                  <li>
                    TrustRadius is a similar product review platform to G2 Crowd
                    as it's also targeted toward B2B software businesses.
                  </li>
                  <li>
                    TrustRadius is a similar product review platform to G2 Crowd
                    as it's also targeted toward B2B software businesses.
                  </li>
                  <li>
                    TrustRadius is a similar product review platform to G2 Crowd
                    as it's also targeted toward B2B software businesses.
                  </li>
                  <li>
                    TrustRadius is a similar product review platform to G2 Crowd
                    as it's also targeted toward B2B software businesses.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {page === 2 && (
          <div className="flex flex-col mt-10 h-screen w-full text-gray-500">
            <h2 className="text-xl font-semibold">Confirm delivery address</h2>
            <p className="text-gray-500 text-sm mb-6">
              High-quality wireless headphones with noise cancellation
            </p>

            {/* Form */}
            <Form
              layout="vertical"
              requiredMark={false}
              className="text-gray-500"
            >
              <div className="grid grid-cols-2 gap-4 w-full !text-gray-500">
                {/* State */}
                <Form.Item
                  label={<div className="!text-gray-600">State</div>}
                  name="state"
                  className="w-full "
                  rules={[{ required: true, message: 'State is required' }]}
                >
                  <Input placeholder="Enter state" />
                </Form.Item>

                {/* City */}
                <Form.Item
                  label={<div className="!text-gray-600">City</div>}
                  name="city"
                  className="w-full"
                  rules={[{ required: true, message: 'City is required' }]}
                >
                  <Input placeholder="Enter city" />
                </Form.Item>
              </div>

              {/* Street Address */}
              <Form.Item
                label={<div className="!text-gray-600">Street Address</div>}
                name="street"
                rules={[
                  { required: true, message: 'Street address is required' },
                ]}
              >
                <Input placeholder="Enter street address" />
              </Form.Item>

              {/* Contact & Email */}
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label={<div className="!text-gray-600">Contact Number</div>}
                  name="contact"
                  rules={[
                    { required: true, message: 'Contact number is required' },
                    { pattern: /^[0-9]+$/, message: 'Only numbers allowed' },
                  ]}
                >
                  <Input placeholder="Enter contact number" />
                </Form.Item>

                <Form.Item
                  label={<div className="!text-gray-600">Email Address</div>}
                  name="email"
                  rules={[
                    { required: true, message: 'Email is required' },
                    { type: 'email', message: 'Invalid email format' },
                  ]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </div>
            </Form>
          </div>
        )}

        <div className="flex justify-between w-full gap-5 mt-6">
          <Button
            type="default"
            onClick={onCancel}
            className="py-2 border-gray-300"
          >
            Reject Offer
          </Button>
          <Button type="primary" className="w-full py-2" onClick={handleClick}>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ProductDetails
