import React from 'react'
import HeroPageImage from '../components/heroPageImage/HeroPageImage'
import ShopCategory from '../components/ShopCategory/ShopCategory'
import BestSellers from '../components/bestSellers/BestSellers'
import FlashSales from '../components/flashSales/flashSales'
import FeaturedBrands from '../components/featuredBrands/FeaturedBrands'

const ShopHeroPage = () => {
  return (
    <div className="responsive-width !mt-5 !mb-20">
      <HeroPageImage />
      <ShopCategory />
      <BestSellers />
      <FlashSales />
      <FeaturedBrands />
    </div>
  )
}

export default ShopHeroPage
