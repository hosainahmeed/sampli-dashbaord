import React, { useState } from "react";
import { Table, Button } from "antd";
import toast from "react-hot-toast";
import productImage from "/public/product_image.svg";
import { useWishListApisQuery } from "../../../../../../Redux/sampler/wishListApis";
import { useBookmarkUpdateMutation } from "../../../../../../Redux/sampler/productApis";
import { useNavigate } from "react-router-dom";

// const productData = [
//   {
//     id: 1,
//     name: "BENGOO G9000 Stereo Gaming Headset",
//     image: productImage,
//     price: "$5.00",
//   },
//   {
//     id: 2,
//     name: "Mini Portable Refillable Sprayer Atomizer Bottle 5ml",
//     image: productImage,
//     price: "$3.00",
//   },
//   {
//     id: 3,
//     name: "Ox 18 Inches Standing Plus Fan",
//     image: productImage,
//     price: "$10.00",
//   },
//   {
//     id: 4,
//     name: "Gaming Headset",
//     image: productImage,
//     price: "$7.00",
//   },
//   {
//     id: 5,
//     name: "Portable Speaker",
//     image: productImage,
//     price: "$15.00",
//   },
//   {
//     id: 6,
//     name: "Smartwatch",
//     image: productImage,
//     price: "$25.00",
//   },
// ];

const WishlistSampler = () => {
  const navigate = useNavigate();
  const [bookmarkUpdate, { isLoading: bookmarkLoading }] =
    useBookmarkUpdateMutation();
  const [userId, setUserId] = useState("");
  const { data: wishlistData, isLoading } = useWishListApisQuery();
  const productData = wishlistData?.data?.result || [];

  const handleRemoveClickBookmark = async (productId) => {
    try {
      const res = await bookmarkUpdate({
        id: productId,
      }).unwrap();
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = async (productId) => {
    try {
      const res = await bookmarkUpdate({
        id: productId,
      }).unwrap();
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Item Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={record?.product?.images?.[0]}
          alt="product"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <p>{record?.product?.name}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => <p>{record?.product?.price}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4 !-mt-3">
          <Button
            loading={bookmarkLoading && userId === record?.product?._id}
            onClick={() => {
              setUserId(record?.product?._id);
              handleRemoveClickBookmark(record?.product?._id);
            }}
            className="hover:!text-black !text-gray-500 border  border-blue-500 hover:bg-gray-100 cursor-pointer rounded !px-7 !py-5"
          >
            Remove
          </Button>
          <button
            type="primary"
            onClick={() =>
              navigate(
                `/sampler/shop/category/${record?.product?.name}/${record?.product?._id}`
              )
            }
            className="!text-blue-500 border border-blue-500 hover:bg-gray-100 cursor-pointer rounded px-3 py-2"
          >
            See Details
          </button>
        </div>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[94vh]">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        <p className="text-[20px] font-semibold ml-2 !mt-5">Loading...</p>
      </div>
    );
  return (
    <div className="h-[94vh] overflow-auto scroll-y-auto scrollbar-none">
      <div className="flex justify-between items-center mb-5">
        <div className="text-xl font-semibold">Wishlists</div>
      </div>

      <Table
        columns={columns}
        dataSource={productData}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          position: ["bottomCenter"],
        }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default WishlistSampler;
