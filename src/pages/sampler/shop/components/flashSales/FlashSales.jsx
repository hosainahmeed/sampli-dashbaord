import React, { useRef } from "react";
import { Card, Carousel, Skeleton } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import CardComponent from "../cardComponent/CardComponent";
import { useGetAllProductsQuery } from "../../../../../Redux/sampler/productApis";
import Meta from "antd/es/card/Meta";

// const items = [
//   {
//     id: 1,
//     image: productImage,
//     title: "BENGOO G9000 Stereo Gaming Headset",
//     description: "High-quality wireless headphones with noise cancellation",
//     price: "$5.00",
//     originalPrice: "$4.00",
//   },
//   {
//     id: 2,
//     image: productImage,
//     title: "Mini Portable Refillable Sprayer Atomizer Bottle 5ml",
//     description: "Compact and portable sprayer for your favorite fragrance",
//     price: "$3.00",
//     originalPrice: "$2.50",
//   },
//   {
//     id: 3,
//     image: productImage,
//     title: "Ox 18 Inches Standing Plus Fan",
//     description: "Powerful fan to keep you cool during hot days",
//     price: "$10.00",
//     originalPrice: "$8.00",
//   },
//   {
//     id: 4,
//     image: productImage,
//     title: "Gaming Headset",
//     description: "Immersive sound experience for gamers",
//     price: "$7.00",
//     originalPrice: "$5.50",
//   },
//   {
//     id: 5,
//     image: productImage,
//     title: "Portable Speaker",
//     description: "Compact speaker with high-quality sound",
//     price: "$15.00",
//     originalPrice: "$12.00",
//   },
//   {
//     id: 6,
//     image: productImage,
//     title: "Smartwatch",
//     description: "Feature-rich smartwatch with multiple health tracking",
//     price: "$25.00",
//     originalPrice: "$20.00",
//   },
//   {
//     id: 7,
//     image: productImage,
//     title: "Wireless Bluetooth Earbuds",
//     description: "Comfortable earbuds with superior sound quality",
//     price: "$30.00",
//     originalPrice: "$25.00",
//   },
//   {
//     id: 8,
//     image: productImage,
//     title: "Digital Camera",
//     description: "Capture high-resolution photos and videos",
//     price: "$200.00",
//     originalPrice: "$180.00",
//   },
// ];

function FlashSales() {
  const carouselRef = useRef(null);
  const { data: getProducts, isLoading } = useGetAllProductsQuery();

  const items = getProducts?.data?.result;
  return (
    <div className=" px-4  mt-24 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[24px]">Flash Sales</h2>
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

      {isLoading && (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 ">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="border border-gray-200 w-full max-w-[250px] rounded-lg overflow-hidden h-[400px]"
              cover={
                <div className="relative">
                  <Skeleton.Image
                    active
                    className="!w-full !h-[230px] object-cover object-center"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <Skeleton.Avatar active size="large" shape="circle" />
                  </div>
                </div>
              }
            >
              <Meta
                title={
                  <Skeleton.Input style={{ width: 120 }} active size="small" />
                }
                description={
                  <div className="flex justify-between flex-col h-[100px]">
                    <div className="text-sm text-gray-600">
                      <Skeleton active paragraph={{ rows: 2 }} title={false} />
                    </div>
                    <div className="flex gap-3 items-center mt-2 text-[18px]">
                      <Skeleton.Input
                        style={{ width: 60 }}
                        active
                        size="small"
                      />
                      <Skeleton.Input
                        style={{ width: 60 }}
                        active
                        size="small"
                      />
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      )}

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
        {items?.map((item, index) => (
          <div key={index} className="ml-7">
            <CardComponent item={item} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default FlashSales;
