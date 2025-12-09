import React from "react";
import HeroPageImage from "../components/heroPageImage/HeroPageImage";
import ShopCategory from "../components/shopCategory/ShopCategory";
import BestSellers from "../components/bestSellers/BestSellers";
import FlashSales from "../components/flashSales/FlashSales";
import FeaturedBrands from "../components/featuredBrands/FeaturedBrands";

const ShopHeroPage = () => {
  return (
    <div className="responsive-width !mt-5 !mb-20">
      <HeroPageImage />
      <ShopCategory />
      <BestSellers />
      <FlashSales />
      {/* <FeaturedBrands /> */}
    </div>
  );
};

export default ShopHeroPage;
