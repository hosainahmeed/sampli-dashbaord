import React, { useState } from "react";
import { FiMessageCircle, FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import gift from "../../../assets/gift-02.svg";
import sale from "../../../assets/sale-03.svg";
import { useGetMyReviewsQuery } from "../../../Redux/sampler/profileApis";
import { AiFillHeart } from "react-icons/ai";
import { Card, Pagination } from "antd";
import { renderImage } from "../samplerFeed/renderImage";
import Spinner from "../../../components/ui/Spinner";

const ProfileReviewsVideo = () => {
  const [sortBy, setSortBy] = useState("");
  const [limit, setLimit] = useState(10);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { data: myReviews, isLoading } = useGetMyReviewsQuery({
    sortBy,
    sortOrder: "desc",
    limit,
    page,
  });
  const myReview = myReviews?.data?.data?.result;


  const renderVideo = (videoUrl) => {
    if (!videoUrl) return null;

    return (
      <div className="relative rounded-xl overflow-hidden bg-black my-4">
        <video
          src={videoUrl}
          controls
          preload="metadata"
          className="w-full max-h-[600px] object-contain"
          playsInline
          controlsList="nodownload"
          onLoadedData={() => setIsVideoLoading(false)}
          onError={() => setIsVideoLoading(false)}
        >
          <track kind="captions" />
        </video>

        {isVideoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Spinner size="large" />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card loading={isLoading}>
      <div className="flex justify-between items-center mt-3">
        <h2 className="text-xl font-semibold">My Reviews</h2>
        {myReview?.length !== 0 && <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="outline-none border border-gray-200 hover:bg-gray-100 px-2 py-2 mb-4 rounded-lg !text-sm cursor-pointer"
          >
            <option value="">Sort by : New</option>
            <option value="totalView">Highest Views</option>
            <option value="totalReferralSales">Highest Referrals </option>
          </select>
        </div>}
      </div>
      <div>
        {myReview?.length === 0 && (
          <Card>
            <div className="text-center flex flex-col items-center justify-center py-10 w-full h-[30vh]">
              <p className="font-bold text-xl">No Reviews Yet</p>
              <p className="mt-5 text-gray-500">
                Looks like you don&apos;t have any reviews at the moment. Check
                back soon!
              </p>
            </div>
          </Card>
        )}
      </div>

      {myReview?.map((review) => (
        <div className=" mx-auto bg-white rounded-lg border border-gray-200 p-4 mt-3">
          <div className="border-b border-gray-200 pb-4 ">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src={`${review?.reviewer?.profile_image}`}
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
                    <span className="text-gray-400 text-sm">
                      •{" "}
                      {new Date(review?.createdAt).toLocaleString("default", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {Array.from({ length: review?.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                      {Array.from({ length: 5 - review?.rating }).map(
                        (_, i) => (
                          <span key={i} className="text-gray-300">
                            ★
                          </span>
                        )
                      )}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {review?.rating}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 text-sm font-medium">
                      {review?.product?.name}
                    </span>
                    <span className="text-green-500 text-sm">
                      ${review?.product?.price}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">
                      {review?.category?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="my-3 text-gray-700">{review?.description}</p>
            <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-3">
              {review?.video ? (
                renderVideo(review?.video)
              ) : (
                renderImage(review?.images)
              )}
            </div>

            <div className="flex items-center gap-4 mt-2">
              <button className="flex items-center gap-1 text-gray-500">
                <AiFillHeart className="text-red-500" size={16} />
                <span>{review?.totalLikers} likes</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
                <FiMessageCircle size={16} />
                <span>{review?.totalComments} comments</span>
              </button>
              {/* <button className="flex items-center gap-1 text-gray-500">
                <FiShare2 size={16} />
                <span>Share</span>
              </button> */}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="font-medium mb-1">Review insights</h3>
            <p className="text-xs text-gray-500 mb-4">Only you can see this</p>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">
                  {review?.totalView}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-1" style={{ filter: "grayscale(100%)" }}>
                    👁️
                  </span>
                  <span>Total Views</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">
                  {review?.totalReferralSales}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-1">🛒</span>
                  <span>Referral sales</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">
                  {review?.totalCommissions}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-1" style={{ filter: "grayscale(100%)" }}>
                    💰
                  </span>
                  <span>Sales Commissions</span>
                </div>
              </div>

              {/* <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">$5</span>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-1 " style={{ filter: "grayscale(100%)" }}>
                    🎁
                  </span>
                  <span>Rewards</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      ))}

      {myReview?.length !== 0 && <div className="mx-auto flex items-center justify-center mt-10">
        <Pagination
          currentPage={myReviews?.data?.data?.meta?.page}
          totalPages={myReviews?.data?.data?.meta?.totalPage}
          onPageChange={(newPage) => {
            setPage(newPage);
            setLimit(limit + 10);
          }}
        />
      </div>}
    </Card>
  );
};

export default ProfileReviewsVideo;
