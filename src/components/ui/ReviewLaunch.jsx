import React from 'react';
import { Card, Empty, Spin } from 'antd';
import { useGetSingleProductApisQuery } from '../../Redux/sampler/productApis';

const ReviewLaunch = () => {
  const campaignDetails = JSON.parse(localStorage.getItem('targetAudience')) || {};
  const selectedProducts = localStorage.getItem('selectedProductId') || null;

  const { data: singleProduct, isLoading: singleProductLoading } = useGetSingleProductApisQuery(
    { id: selectedProducts },
    { skip: !selectedProducts }
  );

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });



  return (
    <div className="max-w-3xl flex flex-col gap-2 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-2 text-center">Review & Launch</h1>
      <p className="text-gray-600 mb-4 text-center">
        Confirm and review your campaign details
      </p>

      <Card className="mb-4">
        <h2 className="text-lg font-semibold">Campaign Details</h2>
        <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
          <p className="font-medium">Campaign name</p>
          <p>{campaignDetails?.name || 'N/A'}</p>
          <p className="font-medium">Target audience size</p>
          <p>{campaignDetails?.audienceSize} Reviewers</p>
          <p className="font-medium">Cost</p>
          <p>${campaignDetails?.amountForEachReview} per review</p>
          <p className="font-medium">Timeline</p>
          <p>{dateFormatter.format(new Date(campaignDetails?.startDate))} - {dateFormatter.format(new Date(campaignDetails?.endDate))}</p>
          <p className="font-medium">Location</p>
          <p>{campaignDetails?.location}</p>
        </div>
      </Card>

      <Card className="mb-4">
        <h2 className="text-lg font-semibold">Products for Review</h2>
        {singleProductLoading ? <Spin /> : singleProduct ? (
          <div className="mt-4">
            <div
              key={singleProduct?.data?._id}
              className="flex items-start space-x-4"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-lg">
                <img
                  className="w-full h-full object-cover"
                  src={singleProduct?.data?.images[0]}
                  alt="product_image"
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div>
                  <h3 className="font-medium">{singleProduct?.data?.name}</h3>
                  <p className="text-gray-600 text-sm">{singleProduct?.data?.category?.name}</p>
                </div>
                <p className="text-gray-500 text-sm">
                  ${singleProduct?.data?.price} {/*• {singleProduct?.data?.units} Units*/}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Empty description="No products selected" />
        )}
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Total Campaign Cost</h2>
        <div className="mt-4 text-gray-700">
          <div className="flex justify-between mb-2">
            <p>
              Base Reviews ({campaignDetails?.numberOfReviewers} × $
              {campaignDetails?.amountForEachReview})
            </p>
            <p>
              ${campaignDetails?.numberOfReviewers * campaignDetails?.amountForEachReview}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Platform Fee (10%)</p>
            <p>
              $
              {(campaignDetails?.numberOfReviewers *
                campaignDetails?.amountForEachReview *
                0.1).toFixed(2)}
            </p>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
            <p>Grand total</p>
            <p>
              $
              {(campaignDetails?.numberOfReviewers *
                campaignDetails?.amountForEachReview *
                1.1).toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default React.memo(ReviewLaunch);
