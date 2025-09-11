import React, { useState } from "react";
import { useGetMyCommentsQuery } from "../../../Redux/sampler/profileApis";
import { Avatar, Rate, Button } from "antd";

const AllComments = () => {
  const { data: comments, isLoading } = useGetMyCommentsQuery();
  const commentsData = comments?.data?.result || [];

  const [following, setFollowing] = useState({});
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleFollow = (username) => {
    setFollowing((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  return (
    <div>
      {commentsData?.map((post) => (
        <div key={post._id} className="border-b border-gray-200 pb-4">
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <Avatar src={post?.review?.reviewer?.profile_image} />

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {post?.review?.reviewer?.name}
                  </span>
                  {/* <span className="text-gray-500 text-sm">
                    {post?.review?.reviewer?.name}
                  </span> */}
                  <span className="text-gray-400 text-sm">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(post?.createdAt))}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Rate
                    disabled
                    defaultValue={post?.review?.rating}
                    className="!text-[16px] !text-[#FD8240]"
                  />
                  <span className="text-gray-500">{post?.review?.rating}</span>
                  <span className="text-gray-500">•</span>
                  <span className="underline underline-offset-4 cursor-pointer">
                    {post?.product?.name}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-green-500">
                    {post?.review?.product?.price}
                  </span>
                  <span className="underline underline-offset-4 cursor-pointer">
                    /{post?.review?.category?.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type={
                  following[post?.review?.reviewer?.name]
                    ? "default"
                    : "primary"
                }
                ghost
                onClick={() => handleFollow(post?.review?.reviewer?.name)}
              >
                {following[post?.review?.reviewer?.name]
                  ? "Following"
                  : "Follow"}
              </Button>
            </div>
          </div>

          <p className="!my-5 text-gray-700">
            {post?.review?.description}
          </p>

          {post?.video && (
            <div
              className="relative rounded-lg overflow-hidden bg-gray-100 mb-4"
              style={{ paddingTop: "56.25%" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <video src={post?.video} controls className="w-full h-full" />
              </div>
            </div>
          )}

          <div>
            {
                  
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllComments;
