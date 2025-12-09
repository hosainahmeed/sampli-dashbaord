import React, { memo, useState } from "react";
import { useBookmarkUpdateMutation } from "../../../../../Redux/sampler/productApis";
import { Card } from "antd";
import toast from "react-hot-toast";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";

const CardComponent = ({ item }) => {
    const navigate = useNavigate();
    const [bookmarkUpdate] = useBookmarkUpdateMutation();
    const [localBookmark, setLocalBookmark] = useState(item?.isBookmark);

    const handleClickBookmark = async () => {
        const previousState = localBookmark;
        setLocalBookmark(!localBookmark);

        try {
            const res = await bookmarkUpdate({ id: item?._id }).unwrap();
            toast.success(res?.message);
        } catch (error) {
            setLocalBookmark(previousState);
            toast.error(error?.data?.message || error?.message || 'Something went wrong!');
        }
    };

    return (
        <Card
            className="border border-gray-200 w-full max-w-[250px] rounded-lg overflow-hidden h-[400px]"
            cover={
                <div>
                    <button className="absolute top-4 right-4 z-10">
                        {localBookmark ? (
                            <HeartFilled
                                className="text-2xl font-bold !text-red-500 rounded-full p-1"
                                onClick={handleClickBookmark}
                            />
                        ) : (
                            <HeartOutlined
                                className="text-2xl text-gray-600 font-bold rounded-full p-1"
                                onClick={handleClickBookmark}
                            />
                        )}
                    </button>

                    <img
                        className="w-full h-[230px] object-cover object-center"
                        alt={item?.name}
                        src={item?.images?.[0]}
                    />
                </div>
            }
        >
            <Meta
                onClick={() => navigate(`/sampler/shop/category/${item?.name}/${item?._id}`)}
                className="cursor-pointer"
                title={item?.name}
                description={
                    <div className="flex justify-between flex-col h-[100px]">
                        <div
                            className="text-sm text-gray-600 line-clamp-1"
                            dangerouslySetInnerHTML={{
                                __html: item?.description,
                            }}
                        />
                        <div className="flex gap-3 items-center text-[18px]">
                            <span className="font-semibold text-black">${item?.price}</span>
                        </div>
                    </div>
                }
            />
        </Card>
    );
};

export default memo(CardComponent);
