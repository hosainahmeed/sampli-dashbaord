import React, { useState } from 'react';
import { Select, Skeleton, Card } from 'antd';
import CampaignCard from '../ui/CampaignCard';
import dollar from '../../assets/icons/dollar.svg';
import { useGetCampaignMetaDataQuery } from '../../Redux/businessApis/meta/camapingAnalysisApis';
const { Option } = Select;
function SalesAnalytics() {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('This Week');
  const { data: campaignData, isLoading: campaignLoading, isFetching } = useGetCampaignMetaDataQuery({
    dateRange: selectedOption,
  });

  const datas = [
    {
      title: 'TOTAL SPENT',
      amount: (
        <div className='flex items-center'>
          <small className="text-[#6D7486] flex items-center gap-2">
            <img className="w-4 h-4" src={dollar} alt='$' />
          </small>
          {campaignLoading || isFetching ? "loading..." : campaignData?.data?.totalSpent?.value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ),
      change: campaignLoading || isFetching ? "loading..." : parseFloat(campaignData?.data?.totalSpent?.change).toFixed(2),
      avgCostPerReview: campaignLoading || isFetching ? "loading..." : parseFloat(campaignData?.data?.avgCostPerReview).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'USD',
      }),
      totalReview: campaignLoading || isFetching ? "loading..." : parseInt(campaignData?.data?.totalReview?.value),
    },
    {
      title: 'TOTAL CAMPAIGN',
      count: campaignLoading || isFetching ? "loading..." : parseInt(campaignData?.data?.totalCampaign?.value),
      change: campaignLoading || isFetching ? "loading..." : parseFloat(campaignData?.data?.totalCampaign?.change).toFixed(2),
      activeCampaigns: campaignLoading || isFetching ? "loading..." : parseInt(campaignData?.data?.activeCampaigns),
      pendingCampaigns: campaignLoading || isFetching ? "loading..." : parseInt(campaignData?.data?.scheduledCampaigns),
    },
  ];

  const handleChange = (value) => {
    try {
      setLoading(true);
      setSelectedOption(value);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex p-2 rounded-md flex-col md:flex-row md:justify-between items-start md:items-center">
        <h1 className="text-2xl">Campaign analytics</h1>
        <div className="flex items-center gap-4 mt-3 md:-mt-0">
          <Select
            value={selectedOption}
            loading={isFetching || campaignLoading}
            style={{ width: 160 }}
            onChange={handleChange}
          >
            <Option value="thisWeek">This Week</Option>
            <Option value="lastWeek">Last Week</Option>
          <Option value="thisMonth">This Month</Option>
          <Option value="lastMonth">Last Month</Option>
            <Option value="thisYear">This Year</Option>
          </Select>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {campaignLoading || loading ? Array.from({ length: 2 }).map((_, index) => (
          <Card loading key={index} />
        )) : datas.map((data) => (
          <CampaignCard key={data.title} data={data} />
        ))}
      </div>
    </div>
  );
}

export default SalesAnalytics;
