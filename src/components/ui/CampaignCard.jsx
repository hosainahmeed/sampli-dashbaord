/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'antd';

function CampaignCard({ data }) {
  console.log(data);

  return (
    <Card className="transition-shadow duration-300 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg">
      <p className="text-sm xl:text-base text-gray-500 font-medium mb-4">
        {data?.title}
      </p>

      <div className="text-lg xl:text-2xl flex items-center mb-4">
        {data?.amount ? (
          <p className="font-semibold text-gray-800">{data?.amount}</p>
        ) : (
          <p className="font-semibold text-gray-800">{data?.count}</p>
        )}
        <p
          className={`text-xs ml-2 p-1 rounded-md ${
            data?.change.includes('-')
              ? 'bg-red-100 text-red-500'
              : 'bg-green-100 text-green-500'
          }`}
        >
          {data?.change}
        </p>
      </div>

      <div className="space-y-2">
        {data?.avgCostPerReview && (
          <div className="text-base flex items-center justify-between">
            <p className="text-sm xl:text-lg text-gray-500">Avg Cost/Review</p>
            <p className="font-medium text-gray-700">
              {data?.avgCostPerReview}
            </p>
          </div>
        )}

        {data?.totalReview && (
          <div className="text-base flex items-center justify-between">
            <p className="text-gray-500">Total Reviews</p>
            <p className="font-medium text-gray-700">{data?.totalReview}</p>
          </div>
        )}

        {data?.activeCampaigns !== undefined &&
          data?.pendingCampaigns !== undefined && (
            <>
              <div className="text-base flex items-center justify-between">
                <p className="text-gray-500">Active Campaigns</p>
                <p className="font-medium text-green-600">
                  {data?.activeCampaigns}
                </p>
              </div>
              <div className="text-base flex items-center justify-between">
                <p className="text-gray-500">Pending Campaigns</p>
                <p className="font-medium text-red-500">
                  {data?.pendingCampaigns}
                </p>
              </div>
            </>
          )}

        {data?.activeUsers !== undefined && (
          <div>
            <div className="text-base flex items-center justify-between">
              <p className="text-gray-500">Active Users</p>
              <p className="font-medium text-gray-700">{data?.activeUsers}</p>
            </div>
            <div className="text-base flex items-center justify-between">
              <p className="text-gray-500">Retention Rate</p>
              <p className="font-medium">{data?.retention_rate}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default CampaignCard;
