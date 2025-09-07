import { Button, Carousel, Pagination } from "antd";
import React, { useRef, useState } from "react";
import CardComponent from "../components/cardComponent/CardComponent";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import SCProductDetails from "./SCProductDetails";
import ReviewRatingSampler from "./ReviewRatingSampler";
import ReviewCardSampler from "./ReviewCardSampler";
import StoreProfileSampler from "./StoreProfileSampler";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import productImage from "/public/product_image.svg";
import { useParams } from "react-router-dom";
import { useGetSingleProductApisQuery } from "../../../../Redux/sampler/productApis";

const items = [
  {
    id: 1,
    image: productImage,
    title: "BENGOO G9000 Stereo Gaming Headset",
    description: "High-quality wireless headphones with noise cancellation",
    price: "$5.00",
    originalPrice: "$4.00",
  },
  {
    id: 2,
    image: productImage,
    title: "Mini Portable Refillable Sprayer Atomizer Bottle 5ml",
    description: "Compact and portable sprayer for your favorite fragrance",
    price: "$3.00",
    originalPrice: "$2.50",
  },
  {
    id: 3,
    image: productImage,
    title: "Ox 18 Inches Standing Plus Fan",
    description: "Powerful fan to keep you cool during hot days",
    price: "$10.00",
    originalPrice: "$8.00",
  },
  {
    id: 4,
    image: productImage,
    title: "Gaming Headset",
    description: "Immersive sound experience for gamers",
    price: "$7.00",
    originalPrice: "$5.50",
  },
  {
    id: 5,
    image: productImage,
    title: "Portable Speaker",
    description: "Compact speaker with high-quality sound",
    price: "$15.00",
    originalPrice: "$12.00",
  },
  {
    id: 6,
    image: productImage,
    title: "Smartwatch",
    description: "Feature-rich smartwatch with multiple health tracking",
    price: "$25.00",
    originalPrice: "$20.00",
  },
  {
    id: 7,
    image: productImage,
    title: "Wireless Bluetooth Earbuds",
    description: "Comfortable earbuds with superior sound quality",
    price: "$30.00",
    originalPrice: "$25.00",
  },
  {
    id: 8,
    image: productImage,
    title: "Digital Camera",
    description: "Capture high-resolution photos and videos",
    price: "$200.00",
    originalPrice: "$180.00",
  },
];

const reviewData = [
  {
    name: "Adeyoka George",
    rating: 2,
    date: "2024-03-12",
    reviewerImage:
      "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png",
    description:
      "This is the description of the product the customer wants to buy.",
    productImage: productImage,
    productName: "High-quality wireless headphones with noise cancellation",
  },
  {
    name: "Adeyoka George",
    rating: 2,
    date: "2024-03-12",
    reviewerImage:
      "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png",
    description:
      "This is the description of the product the customer wants to buy.",
    productImage: productImage,
    productName: "High-quality wireless headphones with noise cancellation",
  },
  {
    name: "Adeyoka George",
    rating: 2,
    date: "2024-03-12",
    reviewerImage:
      "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png",
    description:
      "This is the description of the product the customer wants to buy.",
    productImage: productImage,
    productName: "High-quality wireless headphones with noise cancellation",
  },
  {
    name: "Adeyoka George",
    rating: 2,
    date: "2024-03-12",
    reviewerImage:
      "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png",
    description:
      "This is the description of the product the customer wants to buy.",
    productImage: productImage,
    productName: "High-quality wireless headphones with noise cancellation",
  },
  {
    name: "Adeyoka George",
    rating: 2,
    date: "2024-03-12",
    reviewerImage:
      "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png",
    description:
      "This is the description of the product the customer wants to buy.",
    productImage: productImage,
    productName: "High-quality wireless headphones with noise cancellation",
  },
  {
    name: "Adeyoka George",
    rating: 2,
    date: "2024-03-12",
    reviewerImage:
      "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png",
    description:
      "This is the description of the product the customer wants to buy.",
    productImage: productImage,
    productName: "High-quality wireless headphones with noise cancellation",
  },
  // Add more reviews here...
];
const ServiceWithCategoryProductDetails = () => {
  
  const carouselRef = useRef(null);

  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 5;

  const onReviewPageChange = (page) => {
    setReviewPage(page);
  };

  return (
    <div className="responsive-width !mb-32">
      {/* product details */}
      <section>
        <SCProductDetails />
      </section>

      {/*From same seller  */}
      <section className=" px-4  mt-24 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">From same seller</h2>
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
          {items?.map((item, index) => (
            <div className="ml-7" key={index}>
              <CardComponent item={item} />
            </div>
          ))}
        </Carousel>
      </section>

      {/* store info */}
      <section className="!my-20  px-4">
        <StoreProfileSampler />
      </section>

      {/* Review products */}
      <div className="px-5">
        <div className="text-xl  mb-5">Reviews</div>
        <div className="flex gap-5 items-start ">
          <div className="flex-1">
            <ReviewRatingSampler />
          </div>
          <div className="flex-1">
            {reviewData.map((review, index) => (
              <ReviewCardSampler key={index} review={review} />
            ))}
            <Pagination
              current={reviewPage}
              total={reviewData.length}
              pageSize={reviewsPerPage}
              onChange={onReviewPageChange}
              className="!my-12 flex items-center justify-center"
              showSizeChanger={false}
              itemRender={(current, type, originalElement) => {
                if (type === "prev") {
                  return (
                    <Button className="!border-none ">
                      <FaAngleLeft />
                    </Button>
                  );
                }
                if (type === "next") {
                  return (
                    <Button className="!border-none ">
                      <FaAngleRight />
                    </Button>
                  );
                }
                if (type === "page") {
                  return current;
                }
                return originalElement;
              }}
            />
          </div>
        </div>
      </div>

      {/* similar products */}
      <section className=" px-4  mt-24 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Similar Products</h2>
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
            <div className="ml-7" key={index}>
              <CardComponent item={item} />
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default ServiceWithCategoryProductDetails;
