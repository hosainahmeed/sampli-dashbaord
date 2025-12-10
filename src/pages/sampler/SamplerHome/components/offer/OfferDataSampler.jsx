import React from "react";
import OfferCardSampler from "./OfferCardSampler";
import { useNavigate } from "react-router-dom";
import { useGetCampaignListQuery } from "../../../../../Redux/sampler/campaignApis";
import { Card } from "antd";
const OfferDataSampler = () => {
  const Navigate = useNavigate();


  const { data: getAllOffers, isLoading: offerLoading } =
    useGetCampaignListQuery({
      limit: 4,
      sortOrder: "desc",
    });

  const productData = getAllOffers?.data?.result;

  return (
    <>
      <div className="flex justify-between items-center mb-5 mt-14 ">
        <div className="  text-xl font-semibold">Offers</div>
        <div
          onClick={() => Navigate("/sampler/campaign/all-offer")}
          className="border border-gray-300 px-3 py-2 text-sm text-gray-700  cursor-pointer rounded-md hover:bg-gray-100"
        >
          See all
        </div>
      </div>
      <div>{offerLoading ?
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} loading={true} />
          ))}
        </div>
        : null}</div>
      {!offerLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {productData && productData?.length > 0 ? (
            productData?.map((product) => (
              <OfferCardSampler key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-5 text-center  flex flex-col items-center justify-center py-10 w-full h-[30vh]">
              <p className="font-bold text-xl">No Active Offers Yet</p>
              <p className="mt-5 text-gray-500">
                Looks like you don&apos;t have any offers at the moment. Check
                back soon!
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OfferDataSampler;
