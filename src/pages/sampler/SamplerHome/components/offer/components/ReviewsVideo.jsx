import React, { useState } from "react";
import { FiMessageCircle, FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { useGetAllReviewQuery } from "../../../../../../Redux/sampler/reviewApis";

const ReviewsVideo = ({ showModal, product, status }) => {
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const { data: reviewList } = useGetAllReviewQuery({
    product,
  });
  const reviewListProduct = reviewList?.data?.data?.result;

  console.log(reviewList);
  console.log(reviewListProduct);
  return (
    <>
      <div className=" mx-auto bg-white rounded-lg my-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Uploaded reviews</h2>
          <button
            className={`bg-blue-500 !text-white hover:bg-blue-400 px-4 py-2 rounded-lg text-sm font-medium ${
              status !== "Processing" ? "cursor-not-allowed" : "cursor-pointer "
            }`}
            onClick={showModal}
            disabled={status !== "Processing"}
            // className={
            //   reviewList?.data?.status !== "Processing" &&
            //   "!bg-blue-500 !text-white"
            // }
          >
            Upload New review
          </button>
        </div>
      </div>

      {/* reviewListProduct && reviewListProduct.map((review) => (  */}
      {reviewListProduct &&
        reviewListProduct?.length > 0 &&
        reviewListProduct?.map((review) => (
          <div className=" mx-auto bg-white rounded-lg border border-gray-200 p-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src={review?.reviewer?.profile_image}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {review?.reviewer?.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        @{review?.reviewer?.username}
                      </span>
                      {/* <span className="text-gray-400 text-sm">
                        •{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          minute: "numeric",
                        }).format(new Date(review?.created_at))}{" "}
                        mins ago
                      </span> */}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            style={{
                              color: i < review?.rating ? "#FFB400" : "#d3d3d3",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {review?.product?.name}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 text-sm font-medium">
                        {review?.category?.name}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-green-500 text-sm">
                        ${review?.amount}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400">
                  <FiMoreHorizontal size={16} />
                </button>
              </div>

              {/* <p className="my-3 text-gray-700">
                I&apos;ve been using this serum for a month and the results are
                amazing! My skin looks more radiant and the texture has improved
                significantly. Totally worth the price!
              </p> */}

              <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-3">
                {review?.video && (
                  <div
                    className="relative rounded-lg overflow-hidden bg-gray-100 mb-4"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isLoadingVideo && (
                        <div className="loader absolute">
                          <p className="text-gray-500">Loading video...</p>
                        </div>
                      )}

                      <video
                        src={review?.video}
                        controls
                        preload="metadata"
                        className="absolute inset-0 w-full h-full"
                        onLoadedData={() => setIsLoadingVideo(false)}
                      ></video>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mt-2">
                <button className="flex items-center gap-1 text-gray-500">
                  <CiHeart size={16} />
                  <span>{review?.totalLikers}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500">
                  <FiMessageCircle size={16} />
                  <span>{review?.totalComments}</span>
                </button>
                {/* <button className="flex items-center gap-1 text-gray-500">
              <FiShare2 size={16} />
              <span>Share</span>
            </button> */}
              </div>
            </div>

            {/* <div className="pt-4">
          <h3 className="font-medium mb-1">Review insights</h3>
          <p className="text-xs text-gray-500 mb-4">Only you can see this</p>

          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold">504</span>
              <div className="flex items-center text-gray-500 text-sm">
                <span className="mr-1" style={{ filter: "grayscale(100%)" }}>
                  👁️
                </span>
                <span>Total Views</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold">23</span>
              <div className="flex items-center text-gray-500 text-sm">
                <span className="mr-1">🛒</span>
                <span>Referral sales</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold">$30.00</span>
              <div className="flex items-center text-gray-500 text-sm">
                <span className="mr-1" style={{ filter: "grayscale(100%)" }}>
                  💰
                </span>
                <span>Sales Commissions</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold">$5</span>
              <div className="flex items-center text-gray-500 text-sm">
                <span className="mr-1 " style={{ filter: "grayscale(100%)" }}>
                  🎁
                </span>
                <span>Rewards</span>
              </div>
            </div>
          </div>
        </div> */}
          </div>
        ))}
    </>
  );
};

export default ReviewsVideo;
