import React, { useState } from "react";
import { Button, Card, Pagination, Skeleton } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import logo from "../../../assets/logo/logo.svg";
import { CiCalendar, CiStar } from "react-icons/ci";
import coverImage from "../../../assets/cover-image.png";
import SelectField from "../../../components/page-Component/SelectField";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ReviewRating from "../../../components/store-profile-component/ReviewRating";
import ReviewCard from "../../../components/store-profile-component/ReviewCard";
import { useGetProfileQuery } from "../../../Redux/businessApis/business _profile/getprofileApi";
import { useGetBusinessProductApisQuery } from "../../../Redux/sampler/productApis";
import dummyProductImage from "../../../assets/logo/logo.svg";
const { Meta } = Card;

function StoreProfile() {
  const { data: profile, isLoading } = useGetProfileQuery();
  const { data: products, isLoading: productLoading } = useGetBusinessProductApisQuery({ id: profile?.data?._id }, {
    skip: !profile?.data?._id,
  });

  const items = [
    {
      image:
        "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
      title: "BENGOO G9000 Stereo Gaming Headset",
      description: "High-quality wireless headphones with noise cancellation",
      price: "$5.00",
      originalPrice: "$4.00",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
      title: "BENGOO G9000 Stereo Gaming Headset",
      description: "High-quality wireless headphones with noise cancellation",
      price: "$5.00",
      originalPrice: "$4.00",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
      title: "Mini Portable Refillable Sprayer Atomizer Bottle 5ml",
      description: "Compact and portable sprayer for your favorite fragrance",
      price: "$3.00",
      originalPrice: "$2.50",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
      title: "Ox 18 Inches Standing Plus Fan",
      description: "Powerful fan to keep you cool during hot days",
      price: "$10.00",
      originalPrice: "$8.00",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
      title: "Gaming Headset",
      description: "Immersive sound experience for gamers",
      price: "$7.00",
      originalPrice: "$5.50",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
      title: "Portable Speaker",
      description: "Compact speaker with high-quality sound",
      price: "$15.00",
      originalPrice: "$12.00",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
      title: "Smartwatch",
      description: "Feature-rich smartwatch with multiple health tracking",
      price: "$25.00",
      originalPrice: "$20.00",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
      title: "Wireless Bluetooth Earbuds",
      description: "Comfortable earbuds with superior sound quality",
      price: "$30.00",
      originalPrice: "$25.00",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
      title: "Digital Camera",
      description: "Capture high-resolution photos and videos",
      price: "$200.00",
      originalPrice: "$180.00",
    },
    // Add more items as needed
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
      productImage:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
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
      productImage:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      productName: "High-quality wireless headphones with noise cancellation",
    },
    {
      name: "Adeyoka George",
      rating: 3,
      date: "2024-03-12",
      reviewerImage:
        "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png",
      description:
        "This is the description of the product the customer wants to buy.",
      productImage:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
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
      productImage:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      productName: "High-quality wireless headphones with noise cancellation",
    },
    {
      name: "Adeyoka George",
      rating: 5,
      date: "2024-03-12",
      reviewerImage:
        "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png",
      description:
        "This is the description of the product the customer wants to buy.",
      productImage:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
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
      productImage:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      productName: "High-quality wireless headphones with noise cancellation",
    },
    // Add more reviews here...
  ];

  // Pagination logic for items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Pagination logic for reviews
  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 5;
  const currentReviews = reviewData.slice(
    (reviewPage - 1) * reviewsPerPage,
    reviewPage * reviewsPerPage
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onReviewPageChange = (page) => {
    setReviewPage(page);
  };

  return (
    <div>
      <div className="responsive-width w-full h-48 md:h-64 xl:h-72 z-[888] relative">
        <img
          className="w-full h-full object-cover"
          src={profile?.data?.coverImage || coverImage}
          alt="sampli cover image"
        />
      </div>
      <div className="max-w-screen-xl mx-auto px-2 -mt-12 md:-mt-24 z-[999] relative">
        <div className="md:w-48 md:h-48 w-24 h-24 rounded-full overflow-hidden shadow-2xl flex items-center bg-white justify-center">
          <img src={profile?.data?.logo || logo} alt="sampli image logo" />
        </div>

        <div>
          <h1 className="text-3xl font-semibold !mt-8 text-[#111]">
            {isLoading ? <Skeleton.Input /> : profile?.data?.bussinessName}
          </h1>

          <div className=" flex items-center gap-12 text-[#6D7486]">
            <h1 className="flex items-center gap-2">
              <CiCalendar />
              {isLoading ? <Skeleton.Input size="small" /> : `Joined ${new Date(
                profile?.data?.createdAt
              ).toLocaleString("default", {
                month: "short",
                day: "numeric",
                // year: "numeric",
              })}`}
            </h1>
            <h1 className="flex items-center gap-2">
              <CiStar />
              {isLoading ? <Skeleton.Input size="small" /> : "99% positive feedback"}
            </h1>
            <h1 className="flex items-center gap-2">
              <AiOutlineUser />
              {isLoading ? <Skeleton.Input size="small" /> : profile?.data?.followers?.length || 0} followers
            </h1>
          </div>
        </div>
        <p className="text-[#6D7486] text-xs xl:text-base leading-7">
          {isLoading ? <Card loading /> : profile?.data?.bio}
        </p>
        <div className="flex md:items-center items-start md:flex-row flex-col  justify-between my-12">
          <h2 className="text-xl md:text-3xl">Items</h2>
          <p className="text-sm md:text-base">
            Your category and sorting select fields
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {productLoading || isLoading ?
            Array.from({ length: 8 }).map((_, index) => (
              <ProductLoaderCard key={index} />
            ))
            : products?.data?.result?.map((item) => (
              <CardComponent key={item?._id} item={item} />
            ))}
        </div>
        <Pagination
          current={currentPage}
          total={products?.data?.result?.length}
          pageSize={itemsPerPage}
          onChange={onPageChange}
          className="!my-12 flex items-center justify-center"
          showSizeChanger={false}
          itemRender={(current, type, originalElement) => {
            if (type === "prev" && current > 1) {
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
        <div className="flex items-start md:flex-row flex-col gap-24 justify-between">
          <div className="md:flex-1 w-full md:sticky top-10">
            <ReviewRating />
          </div>
          <div className="mx-auto font-sans w-full md:flex-1">
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="flex gap-2">
                <SelectField
                  placeholder={"Recommended"}
                  className="!w-full reconmended-ant-select "
                  options={[
                    { label: "Recommended", value: "yes" },
                    { label: "Not Recommended", value: "no" },
                  ]}
                ></SelectField>
                <SelectField
                  placeholder={"All stars"}
                  className="!w-full"
                  options={[
                    { label: "1 star", value: "1" },
                    { label: "2 stars", value: "2" },
                    { label: "3 stars", value: "3" },
                    { label: "4 stars", value: "4" },
                    { label: "5 stars", value: "5" },
                  ]}
                ></SelectField>
              </div>
              <div></div>
            </div>
            {currentReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
            <Pagination
              current={reviewPage}
              total={reviewData.length}
              pageSize={reviewsPerPage}
              onChange={onReviewPageChange}
              className="!my-12 flex items-center justify-center"
              showSizeChanger={false}
              itemRender={(current, type, originalElement) => {
                if (type === "prev" && current > 1) {
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
    </div>
  );
}

export default StoreProfile;

const CardComponent = ({ item }) => {
  return (
    <Card
      className="shadow-md border-[1px] overflow-hidden border-[#eee]"
      cover={
        <img
          className="lg:h-[250px] sm:h-[200px] h-[180px] object-contain md:object-cover xl:h-[300px]"
          alt="example"
          src={item?.images[0]}
        />
      }
    >
      <Meta
        title={item?.title}
        description={
          <>
            <p>{item?.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-semibold !text-black">
                {item?.price}
              </span>
              <span className="text-gray-500 line-through">
                {item?.originalPrice}
              </span>
            </div>
          </>
        }
      />
    </Card>
  );
};


const ProductLoaderCard = () => {
  return (
    <Card
      className="shadow-md border-[1px] overflow-hidden border-[#eee]"
      cover={<Skeleton.Image
        style={{
          height: "250px",
          width: "100%",
          objectFit: "cover",
        }}
        />}
    >
      <Meta
        title={"Product Name"}
        description={
          <>
            <p>{"Product Description"}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-semibold !text-black">
                {"Product Price"}
              </span>
              <span className="text-gray-500 line-through">
                {"Original Price"}
              </span>
            </div>
          </>
        }
      />
    </Card>
  );
}