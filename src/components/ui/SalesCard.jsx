import React from 'react';
import { Card } from 'antd';

function SalesCard({ data }) {
  return (
    <Card className="transition-shadow duration-300 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg">
      {/* Title */}
      <p className="text-sm xl:text-base text-gray-500 font-medium mb-4">
        {data?.title}
      </p>

      {/* Value & Change */}
      <div className="text-lg xl:text-2xl flex items-center mb-4">
        <p className="font-semibold text-gray-800">{data?.value}</p>
        {data?.change && (
          <p
            className={`text-xs ml-2 p-1 rounded-md ${
              data?.change.includes('-')
                ? 'bg-red-100 text-red-500'
                : 'bg-green-100 text-green-500'
            }`}
          >
            {data?.change}
          </p>
        )}
      </div>

      {/* Additional Details */}
      <div className="space-y-2">
        {data?.orders !== undefined && (
          <div className="text-base flex items-center justify-between">
            <p className="text-sm xl:text-lg text-gray-500">Orders</p>
            <p className="font-medium text-gray-700">{data?.orders}</p>
          </div>
        )}

        {data?.avgOrderValue !== undefined && (
          <div className="text-base flex items-center justify-between">
            <p className="text-gray-500">Avg Order Value</p>
            <p className="font-medium text-gray-700">{data?.avgOrderValue}</p>
          </div>
        )}

        {data?.conversionRate !== undefined && (
          <div className="text-base flex items-center justify-between">
            <p className="text-gray-500">Conversion Rate</p>
            <p className="font-medium text-green-600">{data?.conversionRate}</p>
          </div>
        )}

        {data?.avgTimeOnProfile !== undefined && (
          <div className="text-base flex items-center justify-between">
            <p className="text-gray-500">Avg Time on Profile</p>
            <p className="font-medium text-gray-700">
              {data?.avgTimeOnProfile}
            </p>
          </div>
        )}

        {data?.checkoutRate !== undefined && (
          <div className="text-base flex items-center justify-between">
            <p className="text-gray-500">Checkout Rate</p>
            <p className="font-medium text-red-500">{data?.checkoutRate}</p>
          </div>
        )}

        {data?.cartAbandonment !== undefined && (
          <div className="text-base flex items-center justify-between">
            <p className="text-gray-500">Cart Abandonment</p>
            <p className="font-medium text-red-500">{data?.cartAbandonment}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default SalesCard;
