import React, { useState } from "react";
import { Button, Card, Empty, Pagination, Skeleton } from "antd";
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
import { useProductReviewByIdQuery } from "../../../Redux/businessApis/business_product/productReviewApis";
import { Link } from "react-router-dom";

const { Meta } = Card;

function StoreProfile() {
  const { data: profile, isLoading } = useGetProfileQuery();
  const { data: products, isLoading: productLoading } = useGetBusinessProductApisQuery({ id: profile?.data?._id }, {
    skip: !profile?.data?._id,
  });
  const [reviewId, setReviewId] = useState(null);
  const { data: reviewDatas, isLoading: reviewLoading } = useProductReviewByIdQuery(reviewId, { skip: !reviewId })
  const review = reviewDatas?.data?.result

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="responsive-width w-full h-48 md:h-64 xl:h-72 z-[888] relative">
        <img
          className="w-full h-full object-contain"
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
            {/* <h1 className="flex items-center gap-2">
              <CiStar />
              {isLoading ? <Skeleton.Input size="small" /> : "99% positive feedback"}
            </h1> */}
            <h1 className="flex items-center gap-2">
              <AiOutlineUser />
              {isLoading ? <Skeleton.Input size="small" /> : profile?.data?.followers?.length || 0} followers
            </h1>
          </div>
        </div>
        <p className="text-[#6D7486] text-xs xl:text-base leading-7">
          {isLoading ? <Card loading /> : profile?.data?.bio || <span>No bio available please{" "}
            <Link to="/settings" state={{ tab: "businessInfo" }}><span className="text-blue-500 underline cursor-pointer">add</span></Link>
            {" "}bio</span>}
        </p>
        <div className="flex md:items-center items-start md:flex-row flex-col  justify-between my-12">
          <h2 className="text-xl md:text-3xl">Items</h2>
          {/* <p className="text-sm md:text-base">
            Your category and sorting select fields
          </p> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-8">
          {productLoading || isLoading ?
            Array.from({ length: 8 }).map((_, index) => (
              <ProductLoaderCard key={index} />
            ))
            : products?.data?.result?.length > 0 ? products?.data?.result?.map((item) => (
              <CardComponent key={item?._id} item={item} setReviewId={setReviewId} />
            )) : <div className="col-span-4">
              <Empty description={<span>No products found <Link to="/product/add-product">
                <span className="text-blue-500 underline cursor-pointer">Create product</span></Link></span>} />
            </div>}
        </div>
        {products?.data?.result?.length > itemsPerPage && <Pagination
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
        />}
        {reviewLoading ? <Skeleton style={{marginTop:"48px"}} /> : <div id="review" className="flex !mt-12 items-start md:flex-row flex-col gap-24 justify-between">
          {review && <>
            <div className="md:flex-1 w-full md:sticky top-10 !mt-4">
              <ReviewRating rating={reviewDatas?.data} />
            </div>
            <div className="mx-auto font-sans w-full md:flex-1">
              <div className="w-full flex items-center gap-3 justify-between">
                <div className="flex gap-2">
                  {/* <SelectField
                    placeholder={"Recommended"}
                    className="!w-full reconmended-ant-select "
                    options={[
                      { label: "Recommended", value: "yes" },
                      { label: "Not Recommended", value: "no" },
                    ]}
                  ></SelectField> */}
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
              </div>
              {review?.length > 0 ? review?.map((review) => (
                <ReviewCard key={review?._id} r={review} reviewLoading={reviewLoading} />
              )) : <Empty description="No reviews found" />}
              {/* <Pagination
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
            /> */}
            </div>
          </>}
        </div>}
      </div>
    </div>
  );
}

export default StoreProfile;

const CardComponent = ({ item, setReviewId }) => {
  return (
    <Card
      onClick={() => {
        setReviewId(item?._id)
        document.getElementById("review").scrollIntoView({ behavior: "smooth" })
      }}
      className="shadow-md cursor-pointer border-[1px] overflow-hidden border-[#eee]"
      cover={
        <img
          className="lg:h-[250px] sm:h-[200px] h-[180px] object-contain xl:h-[300px]"
          alt={item?.name}
          src={item?.images[0]}
        />
      }
    >
      <Meta
        title={item?.name}
        description={
          <>
            <p className="line-clamp-1">{item?.shortDescription}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-semibold !text-black">
                ${item?.price}
              </span>
              {item?.originalPrice && <span className="text-gray-500 line-through">
                ${item?.originalPrice}
              </span>}
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
      cover={<Skeleton.Image className="!h-[250px] !w-full !object-cover" />}
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