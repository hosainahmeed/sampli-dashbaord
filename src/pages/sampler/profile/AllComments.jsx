import React, { useState } from "react";
import { useGetMyCommentsQuery } from "../../../Redux/sampler/profileApis";
import { Avatar, Rate, Button, Pagination, Card } from "antd";
import { Link } from "react-router-dom";

const AllComments = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data: comments, isLoading } = useGetMyCommentsQuery({
    limit,
    page,
  });
  const commentsData = comments?.data?.result || [];
  return (
    <Card loading={isLoading}>
      <div className="flex justify-between items-center mt-3">
        <h2 className="text-xl font-semibold !mb-10">My Comments</h2>
      </div>
      {comments?.data?.result?.length > 0 ?
        <div className=" mx-auto bg-white rounded-lg border border-gray-200 p-4">
          {
            commentsData?.map((post) => (
              <div
                key={post._id}
                className="border border-gray-200 pb-4 mb-5 p-5 rounded-2xl"
              >
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
                          {post?.review?.createdAt && new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          }).format(new Date(post?.review?.createdAt))}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Rate
                          disabled
                          defaultValue={post?.review?.rating}
                          className="!text-[16px] !text-[#FD8240]"
                        />
                        <span className="text-gray-500">
                          {post?.review?.rating}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="underline underline-offset-4 cursor-pointer">
                          {post?.review?.product?.name}
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
                  <div>
                    <Link
                      to={`/sampler/shop/category/${post?.review?.product?.name}/${post?.review?.product?._id}`}
                    >
                      View Product
                    </Link>
                  </div>
                </div>

                <p className="!my-5 text-gray-700">{post?.review?.description}</p>

                {post?.review?.video && (
                  <div
                    className="relative rounded-lg overflow-hidden bg-gray-100 mb-4"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <video
                        controlsList="nodownload"
                        src={post?.review?.video}
                        controls
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )}

                <div className="ml-10">
                  {
                    <div className="p-3 bg-gray-100">
                      <div className="flex items-center gap-2">
                        <Avatar src={post?.commentor?.profile_image} />
                        <span className="flex items-center gap-2">
                          <span className="font-medium">
                            {post?.commentor?.name}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "2-digit",
                            }).format(new Date(post?.createdAt))}
                          </span>
                        </span>
                      </div>
                      <div className="mt-3 text-gray-700 ml-10">{post?.text}</div>
                    </div>
                  }
                </div>
              </div>
            ))}
          <div
            className="text-center text-blue-500 cursor-pointer hover:underline"
            onClick={() => setLimit(limit + 10)}
          >
            {comments?.data?.meta?.total > limit && "Load More"}
          </div>
        </div>
        :
        <Card>
          <div className="!w-full col-span-2 flex flex-col items-center justify-center py-20 text-center">
            <p className="text-2xl font-semibold mb-2">No comments yet</p>
            <p className="text-base text-[#6D7486]">
              Looks like you don't have any comments!.
            </p>
          </div>
        </Card>
      }

      <div className="mx-auto flex items-center justify-center mt-10">
        {commentsData?.length > 5 &&
          <Pagination
            currentPage={comments?.data?.meta?.page}
            totalPages={comments?.data?.meta?.totalPage}
            onPageChange={(newPage) => {
              setPage(newPage);
              setLimit(limit + 10);
            }}
          />}
      </div>
    </Card>
  );
};

export default AllComments;
