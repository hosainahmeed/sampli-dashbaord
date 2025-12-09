import { Card } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useBookmarkUpdateMutation } from "../../../../../Redux/sampler/productApis";
import toast from "react-hot-toast";
const CardComponent = ({ item }) => {
  const navigate = useNavigate();
  const [localBookmark, setLocalBookmark] = useState(item?.isBookmark);

  const [bookmarkUpdate] =
    useBookmarkUpdateMutation();

  const handleClickBookmark = async (product) => {
    const previousState = localBookmark;
    setLocalBookmark(!localBookmark);
    try {
      const res = await bookmarkUpdate({
        id: product,
      }).unwrap();
      toast.success(res?.message);
    } catch (error) {
      setLocalBookmark(previousState);
      toast.error(error?.data?.message || error?.message || 'Something went wrong!');
    }
  };

  return (
    <Card
      className=" border  border-gray-200 w-full max-w-[250px] rounded-lg overflow-hidden h-[400px]"
      cover={
        <div>
          <button className="absolute top-4 right-4 z-10">
            {localBookmark ? (
              <HeartFilled
                className="text-2xl font-bold !text-red-500 rounded-full p-1 "
                onClick={() => {
                  handleClickBookmark(item?._id);
                }}
              />
            ) : (
              <HeartOutlined
                className="text-2xl text-gray-600 font-bold rounded-full p-1"
                onClick={() => {
                  handleClickBookmark(item?._id);
                }}
              />
            )}
          </button>
          <img
            className="w-full h-[230px]  object-cover object-center"
            alt={item?.name}
            src={item?.images?.[0]}
          />
        </div>
      }
    >
      <Meta
        onClick={() => {
          navigate(`/sampler/shop/category/${item?.name}/${item?._id}`);
        }}
        className="cursor-pointer"
        title={item?.name}
        description={
          <div className="flex justify-between flex-col  h-[100px]">
            {item?.shortDescription && <p className="line-clamp-2">{item?.shortDescription}</p>}
            <div className="flex gap-3 items-center mt-1 text-[18px] ">
              <span className=" font-semibold text-black">${item?.price}</span>
              {/* <span className="text-gray-500 line-through ">
                {item?.originalPrice}
              </span> */}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default CardComponent;
