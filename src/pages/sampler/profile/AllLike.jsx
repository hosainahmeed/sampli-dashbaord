import React, { useState } from "react";
import { useGetMyLikesQuery } from "../../../Redux/sampler/profileApis";
import { Avatar, Card, Pagination, Rate } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const AllLike = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const { data: likes, isLoading } = useGetMyLikesQuery({
        limit,
        page,
    });
    const likesData = likes?.data?.result;
    return (
        <Card loading={isLoading}>
            <div className="flex justify-between items-center mt-3">
                <h2 className="text-xl font-semibold !mb-10">My Liked</h2>
            </div>
            {likesData?.length > 0 ?
                <div className=" mx-auto bg-white rounded-lg border border-gray-200 p-4">
                    {likesData?.map((post) => (
                        <div
                            key={post._id}
                            className="border border-gray-200 pb-4 mb-5 p-5 rounded-2xl"
                        >
                            <div className="flex justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Avatar src={post?.reviewer?.profile_image} />

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{post?.reviewer?.name}</span>
                                            {/* <span className="text-gray-500 text-sm">
                    {post?.reviewer?.name}
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
                                                defaultValue={post?.rating}
                                                className="!text-[16px] !text-[#FD8240]"
                                            />
                                            <span className="text-gray-500">{post?.rating}</span>
                                            <span className="text-gray-500">•</span>
                                            <span className="underline underline-offset-4 cursor-pointer">
                                                {post?.product?.name}
                                            </span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-green-500">
                                                {post?.product?.price}
                                            </span>
                                            <span className="underline underline-offset-4 cursor-pointer">
                                                /{post?.category?.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Link
                                        to={`/sampler/shop/category/${post?.product?.name}/${post?.product?._id}`}
                                    >
                                        View Product
                                    </Link>
                                </div>
                            </div>

                            <p className="!my-5 text-gray-700">{post?.description}</p>

                            {post?.video && (
                                <div
                                    className="relative rounded-lg overflow-hidden bg-gray-100 mb-4"
                                    style={{ paddingTop: "56.25%" }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <video
                                            controlsList="nodownload"
                                            src={post?.video} controls className="w-full h-full" />
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-1">
                                    <FaRegComment />
                                    {post?.totalComments}
                                </div>
                                <div className="flex items-center gap-1">
                                    <AiOutlineLike />
                                    {post?.likers?.length}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <Card>
                    <div
                        key="noOffers"
                        className="text-center flex flex-col items-center justify-center py-10 w-full h-[30vh]"
                    >
                        <p className="font-bold text-xl">No Liks</p>
                        <p className="mt-5 text-gray-500 max-w-[400px] w-full">
                            Looks like you don't have any Likes!
                        </p>
                    </div>
                </Card>
            }

            {likesData?.length !== 0 && <div className="mx-auto flex items-center justify-center mt-10">
                <Pagination
                    currentPage={likes?.data?.meta?.page}
                    totalPages={likes?.data?.meta?.totalPage}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                        setLimit(limit + 10);
                    }}
                />
            </div>}
        </Card>
    );
};

export default AllLike;
