import React from "react";
import { Card } from "antd";

function SalesCard({
  title,
  totalAmount,
  avgCost,
  totalReviews,
  percentageChange,
}) {
  return (
    <Card className="transition-shadow duration-300">
      {/* Title */}
      <p className="text-sm xl:text-base text-[#666] font-medium mb-4">
        {title}
      </p>

      {/* Total Amount */}
      <div className="text-lg xl:text-2xl flex items-center mb-6">
        <p className="font-semibold"> ${totalAmount}</p>
        <p className="text-[#dadada] text-[12px] xl:text-xs ml-2 p-1 bg-[#f8f8f8] rounded-md">
          {percentageChange}
        </p>
      </div>

      {/* Average Cost and Total Reviews */}
      <div className="space-y-2">
        <div className="text-base flex items-center justify-between">
          <p className="text-sm xl:text-lg text-[#666]">Avg Cost/Review</p>
          <p className="font-medium">${avgCost}</p>
        </div>
        <div className="text-base flex items-center justify-between">
          <p className="text-[#666]">Total Reviews</p>
          <p className="font-medium">{totalReviews}</p>
        </div>
      </div>
    </Card>
  );
}

export default SalesCard;
