import React from "react";
import { Card } from "antd";
import { BiDollar } from "react-icons/bi";

function CustomCard({
  title,
  totalAmount,
  avgCost,
  totalReviews,
  percentageChange,
}) {
  return (
    <Card className="h-[220px] transition-shadow duration-300">
      {/* Title */}
      <p className="text-base text-[#666] font-medium mb-4">{title}</p>

      {/* Total Amount */}
      <div className="text-2xl flex items-center mb-6">
        <BiDollar className="text-[#999Eab] mr-2" />
        <p className="font-semibold">{totalAmount}</p>
        <small className="text-[#dadada] text-xs ml-2 p-1 bg-[#f8f8f8] rounded-md">
          {percentageChange}
        </small>
      </div>

      {/* Average Cost and Total Reviews */}
      <div className="space-y-2">
        <div className="text-base flex items-center justify-between">
          <p className="text-[#666]">Avg Cost/Review</p>
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

export default CustomCard;
