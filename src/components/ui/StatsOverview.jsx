import React from 'react';
import img from '../../assets/icons/dollar.svg';
import { useGetCampaignStatusQuery } from '../../Redux/businessApis/campaign/campaignApis';
import { Card } from 'antd';
function StatsOverview() {
  const { data, isLoading } = useGetCampaignStatusQuery();
  const statsData = [
    {
      title: 'Total Campaigns',
      value: parseFloat(data?.data?.totalCampaigns).toLocaleString('en-US') || 0,
    },
    {
      title: 'Total Spent',
      value: parseFloat(data?.data?.totalSpent).toLocaleString('en-US') || 0,
    },
    {
      title: 'Active Campaigns',
      value: parseFloat(data?.data?.activeCampaigns).toLocaleString('en-US') || 0,
    },
    {
      title: 'Average Rating',
      value: data?.data?.averageRating === null ? "N/A" : parseFloat(data?.data?.averageRating).toLocaleString('en-US'),
    },
  ];
  return (
    <div className={`grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-4 gap-4 ${isLoading ? "" : "border border-[#dadada] overflow-hidden"} rounded-3xl`}>
      {isLoading ?
        Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} loading />
        ))
        : !isLoading && statsData?.map((key, idx) => (
          <div
            key={idx}
            className="flex p-8 shadow md:shadow-none md:border-r border-[#999Eab] flex-col items-start justify-center text-[#26282F] cursor-pointer transition-all"
          >
            <h1 className="uppercase text-xs xl:text-base text-[#6D7486]">
              {key?.title}
            </h1>
            <h1 className="sm:text-xl xl:text-4xl font-semibold">
              {key?.title === 'Total Spent' ? (
                <span className='flex items-center gap-2'>
                  <img src={img} /> {key?.value}
                </span>
              ) : (
                key?.value
              )}
            </h1>
          </div>
        ))}
    </div>
  );
}

export default StatsOverview;
