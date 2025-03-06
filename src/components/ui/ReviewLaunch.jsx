import React, { useState, useEffect } from 'react';
import { Card, Empty } from 'antd';

const ReviewLaunch = () => {
  const [campaignDetails, setCampaignDetails] = useState(() => {
    return JSON.parse(localStorage.getItem('targetAudience')) || {};
  });
  console.log(campaignDetails);

  const selectedProducts =
    JSON.parse(localStorage.getItem('selectedProducts')) || [];

  useEffect(() => {
    localStorage.setItem('campaignDetails', JSON.stringify(campaignDetails));
  }, [campaignDetails]);

  return (
    <div className="max-w-3xl flex flex-col gap-2 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-2">Review & Launch</h1>
      <p className="text-gray-600 mb-4">
        Confirm and review your campaign details
      </p>

      <Card className="mb-4">
        <h2 className="text-lg font-semibold">Campaign Details</h2>
        <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
          <p className="font-medium">Campaign name</p>
          <p>{campaignDetails.name || 'N/A'}</p>
          <p className="font-medium">Target audience size</p>
          <p>{campaignDetails.audienceSize} Reviewers</p>
          <p className="font-medium">Cost</p>
          <p>${campaignDetails.costPerReview} per review</p>
          <p className="font-medium">Timeline</p>
          <p>{campaignDetails.timeline}</p>
          <p className="font-medium">Location</p>
          <p>{campaignDetails.location}</p>
        </div>
      </Card>

      <Card className="mb-4">
        <h2 className="text-lg font-semibold">Products for Review</h2>
        {selectedProducts.length > 0 ? (
          <div className="mt-4">
            {selectedProducts.map((product) => (
              <div
                key={product?.id}
                className="flex items-start space-x-4 mb-4 border-b pb-4"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={product?.image}
                    alt="product_image"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{product?.name}</h3>
                  <p className="text-gray-600 text-sm">{product?.category}</p>
                  <p className="text-gray-500 text-sm">
                    ${product?.price} • {product?.units} Units
                  </p>
                </div>
              </div>
            ))}
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
              Base Reviews ({campaignDetails.audienceSize} × $
              {campaignDetails.costPerReview})
            </p>
            <p>
              ${campaignDetails.audienceSize * campaignDetails.costPerReview}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Platform Fee (10%)</p>
            <p>
              $
              {(campaignDetails.audienceSize *
                campaignDetails.costPerReview *
                0.1).toFixed(2)}
            </p>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <p>Grand total</p>
            <p>
              $
              {(campaignDetails.audienceSize *
                campaignDetails.costPerReview *
                1.1).toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default React.memo(ReviewLaunch);
