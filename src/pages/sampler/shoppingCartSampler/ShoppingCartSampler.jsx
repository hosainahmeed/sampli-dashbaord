import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import productImage from "/public/product_image.svg";
import { useGetAllCartItemsQuery } from "../../../Redux/sampler/cartApis";

const ShoppingCartSampler = () => {
  const { data: getAllCartItems } = useGetAllCartItemsQuery();
  const cart = getAllCartItems?.data?.totalQuantity;
  return (
    <div className="relative">
      <LuShoppingCart className="hover:text-black text-gray-500 transition-all" />
      {cart > 0 && (
        <div className="absolute -top-1 left-3 bg-red-500 rounded-full text-white !text-[12px]  w-4 h-4 flex items-center justify-center">
          {cart}
        </div>
      )}
    </div>
  );
};

export default ShoppingCartSampler;
