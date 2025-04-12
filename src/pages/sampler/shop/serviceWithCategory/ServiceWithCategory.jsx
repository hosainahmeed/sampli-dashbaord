import React, { useState } from 'react'
import { Card, Input, Select, Typography, Badge } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../breadcrumbs/Breadcrumbs'
import productImage from '/public/product_image.svg'

const { Search } = Input
const { Title, Text } = Typography
const { Meta } = Card

const initialProducts = [
  {
    id: 1,
    title: 'BENGOO G9000 Stereo Gaming Headset',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 10.0,
    originalPrice: 4.0,
    image: productImage,
    category: 'Air Conditioners',
  },
  {
    id: 2,
    title: 'Ahsan',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 25.0,
    originalPrice: 4.0,
    image: productImage,
    category: 'Headphones',
  },
  {
    id: 3,
    title: 'Mahfuz',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 5.0,
    originalPrice: 4.0,
    image: productImage,
    category: 'Headphones',
  },
]

const categories = [
  'TVs',
  'Stereos',
  'Standing Fans',
  'Air Conditioners',
  'Headphones',
]

const ServiceWithCategory = () => {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('relevance')

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })

  const toggleWishlist = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, isWishlisted: !product.isWishlisted }
          : product
      )
    )
  }
  const navigate = useNavigate()

  return (
    <div className="responsive-width ">
      <div className="h-screen mx-auto px-4 !mt-5 !mb-32">
        <Breadcrumbs />
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>Electronics</Title>
        </div>

        <div className="flex gap-6 mb-6 overflow-x-auto pb-4">
          {categories.map((category) => (
            <div key={category} className="px-2 ">
              <Badge className="!mt-2" dot={selectedCategory === category}>
                <Card
                  hoverable
                  className="w-48 text-center cursor-pointer  !border-none"
                  bodyStyle={{ padding: '12px' }}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div>
                    <img
                      className="w-30 h-30 bg-gray-100 rounded-full mx-auto mb-2 p-5"
                      src={productImage}
                      alt=""
                    />
                  </div>
                  <Text>{category}</Text>
                </Card>
              </Badge>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="flex-1">
            <Search
              placeholder="Search products..."
              allowClear
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            defaultValue="relevance"
            className="w-48"
            onChange={setSortBy}
            options={[
              { value: 'relevance', label: 'Relevance' },
              { value: 'price-low', label: 'Low to High' },
              { value: 'price-high', label: 'High to Low' },
              { value: 'newest', label: 'Newest' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              onClick={() => {
                navigate(`/sampler/shop/${product.title}/${product.id}`)
              }}
              key={product.id}
              className="shadow-md border hover:shadow-2xl cursor-pointer border-gray-200 w-full max-w-[250px] rounded-lg overflow-hidden h-[400px]"
              cover={
                <div className="relative">
                  {product.isWishlisted ? (
                    <HeartFilled
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      className="cursor-pointer absolute top-2 right-2 text-4xl font-bold text-red-500"
                    />
                  ) : (
                    <HeartOutlined
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      className="cursor-pointer absolute top-2 right-2 text-4xl !text-gray-600 rounded-full p-1 hover:!text-red-500"
                    />
                  )}
                  <img
                    className="w-full h-[230px] object-cover object-center"
                    alt={product.title}
                    src={product.image}
                  />
                </div>
              }
            >
              <Meta
                title={product.title}
                description={
                  <div className="flex justify-between flex-col h-[100px]">
                    <div className="text-sm text-gray-600">
                      {product.description}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceWithCategory
