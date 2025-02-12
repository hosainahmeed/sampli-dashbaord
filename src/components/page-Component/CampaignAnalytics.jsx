import React, { useState } from "react";
import { Select, DatePicker } from "antd";
import SalesCard from "../ui/SalesCard";

const { Option } = Select;
const { RangePicker } = DatePicker;

function CampaignAnalytics() {
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [customDateRange, setCustomDateRange] = useState(null);

  const handleChange = (value) => {
    setSelectedOption(value);
    if (value !== "Custom Date Range") {
      setCustomDateRange(null);
    }
  };

  const handleDateChange = (dates) => {
    setCustomDateRange(dates);
    console.log("Selected Date Range:", dates);
  };
  console.log(customDateRange);

  return (
    <div className="w-full">
      <div className="flex p-2 rounded-md justify-between items-center">
        <h1 className="text-2xl">Campaign analytics</h1>
        <div className="flex items-center gap-4">
          <Select
            value={selectedOption}
            style={{ width: 160 }}
            onChange={handleChange}
          >
            <Option value="This Week">This Week</Option>
            <Option value="Last Week">Last Week</Option>
            <Option value="This Month">This Month</Option>
            <Option value="Last Month">Last Month</Option>
            <Option value="Custom Date Range">Custom Date Range</Option>
          </Select>

          {/* Show Date Picker when "Custom Date Range" is selected */}
          {selectedOption === "Custom Date Range" && (
            <RangePicker onChange={handleDateChange} />
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }, (_, index) => (
          <SalesCard
            className="card"
            key={index}
            title="Total Revenue"
            totalAmount="1,500.00"
            avgCost="10.00"
            totalReviews="150"
            percentageChange="+5%"
          />
        ))}
      </div>
    </div>
  );
}

export default CampaignAnalytics;
