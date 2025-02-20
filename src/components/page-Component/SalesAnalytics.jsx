import React, { useState } from 'react';
import { Select, DatePicker } from 'antd';
import SalesCard from '../ui/SalesCard';

const { Option } = Select;
const { RangePicker } = DatePicker;

function CampaignAnalytics() {
  const [selectedOption, setSelectedOption] = useState('This Week');
  const [customDateRange, setCustomDateRange] = useState(null);

  const datas = [
    {
      title: 'Total Revenue',
      value: '$3,434.00',
      change: '+30%',
      orders: 342,
      avgOrderValue: '$340',
    },
    {
      title: 'Total View',
      value: 334,
      change: '+30%',
      conversionRate: '2.76%',
      avgTimeOnProfile: '4:32',
    },
    {
      title: 'Orders',
      value: 34,
      change: '+30%',
      checkoutRate: '42%',
      cartAbandonment: '42%',
    },
  ];
  const handleChange = (value) => {
    setSelectedOption(value);
    if (value !== 'Custom Date Range') {
      setCustomDateRange(null);
    }
  };

  const handleDateChange = (dates) => {
    setCustomDateRange(dates);
    console.log('Selected Date Range:', dates);
  };

  return (
    <div className="w-full">
      <div className="flex p-2 rounded-md justify-between items-center">
        <h1 className="text-2xl">Sales analytics</h1>
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
          {selectedOption === 'Custom Date Range' && (
            <RangePicker onChange={handleDateChange} />
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-3 gap-4">
        {datas.map((data) => (
          <SalesCard key={data.title} data={data} />
        ))}
      </div>
    </div>
  );
}

export default CampaignAnalytics;
