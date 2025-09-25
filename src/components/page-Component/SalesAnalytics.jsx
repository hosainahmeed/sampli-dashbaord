import React, { useState } from 'react';
import { Select, DatePicker, Card, Skeleton } from 'antd';
import SalesCard from '../ui/SalesCard';
import dollar from '../../assets/icons/dollar.svg';
import { useGetBusinessSalesMetaQuery } from '../../Redux/businessApis/meta/bussinessMetaApis';
const { Option } = Select;
const { RangePicker } = DatePicker;

function CampaignAnalytics() {
  const [selectedOption, setSelectedOption] = useState('today');
  const { data: salesMeta, isLoading: salesMetaLoading, isFetching: salesMetaFetching } = useGetBusinessSalesMetaQuery({
    dateRange: selectedOption,
  });
  if (salesMetaLoading) {
    const array = Array.from({ length: 3 });
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {array.map((_, index) => (
          <Card loading key={index} />
        ))}
      </div>
    );
  }
  const datas = [
    {
      title: 'Total Revenue',
      value: (
        <div className="flex items-center">
          <small className="text-[#6D7486] flex items-center gap-2">
            <img className="w-4 h-4" src={dollar} alt="$" />
          </small>
          {salesMetaFetching ? "loading..." : salesMeta?.data?.totalRevenue?.value?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ),
      change: salesMetaFetching ? "loading..." : salesMeta?.data?.totalRevenue?.change?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    },
    {
      title: 'Total Orders',
      value: salesMetaFetching ? "loading..." : salesMeta?.data?.totalOrders?.value,
      change: salesMetaFetching ? "loading..." : salesMeta?.data?.totalOrders?.change?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    },
    {
      title: 'Average Order Value',
      value: salesMetaFetching ? "loading..." : salesMeta?.data?.avgOrderValue?.value?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      change: salesMetaFetching ? "loading..." : salesMeta?.data?.avgOrderValue?.change?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    },
  ];
  const handleChange = (value) => {
    setSelectedOption(value);
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
            loading={salesMetaFetching || salesMetaLoading}
          >
            <Option value="today">Today</Option>
            <Option value="thisWeek">This Week</Option>
            <Option value="lastWeek">Last Week</Option>
            <Option value="thisMonth">This Month</Option>
            <Option value="lastMonth">Last Month</Option>
            <Option value="thisYear">This Year</Option>
            <Option value="lastYear">Last Year</Option>
          </Select>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {datas?.map((data) => (
          <SalesCard key={data.title} data={data} />
        ))}
      </div>
    </div>
  );
}

export default CampaignAnalytics;
