import React from 'react';
import { Button } from 'antd';
import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CampaignPerformanceChart from '../../components/ui/CampaignPerformanceChart';
import AllFeedCard from '../../components/page-Component/AllFeedCard';
import toast from 'react-hot-toast';

function SingleCampaign() {
  const navigate = useNavigate();
  const statsData = {
    timeline: 'Mar 23, 2024 - Sep 30, 2024',
    budget: { spent: 25000, total: 100000 },
    status: 'Active',
    progress: { current: 10, total: 300 },
    reviewsCompleted: 32,
    totalSpent: 12450,
    averageRating: 4.3,
    daysRemaining: 12,
  };

  const handleCampaignEdit = () => {
    navigate('/campaign/single-campaign/edit-campaign');
  };
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-8">
      <div
        className="flex items-center gap-2 text-[#999Eab] cursor-pointer hover:text-[#111] transition-all"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <h1 className="!mt-2">Back to campaign</h1>
      </div>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between">
        <div className="mt-12">
          <h1 className="text-2xl xl:text-4xl">Summer Collection Review</h1>
          <p className="text-sm xl:text-base font-normal text-[var(--body-text)]">
            This is is a test for summer collection before it sent out for mass
            production
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 xl:mt-0">
          <Button onClick={() => handleCampaignEdit()}>Edit Campaign</Button>
          <Button
            onClick={() => {
              toast.success('Campaign Paused');
            }}
            style={{ color: 'red' }}
          >
            Pause Campaign
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#999Eab] rounded-3xl overflow-hidden">
        {/* Timeline */}
        <div className="flex flex-col p-6 border border-[#999Eab]">
          <h1 className="uppercase text-xs xl:text-sm text-gray-500">
            Timeline
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            {statsData.timeline}
          </h1>
        </div>

        {/* Budget */}
        <div className="flex flex-col p-6 border border-[#999Eab]">
          <h1 className="uppercase text-xs sm:text-sm text-gray-500">Budget</h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            ${statsData.budget.spent.toLocaleString()} of $
            {statsData.budget.total.toLocaleString()}
          </h1>
        </div>

        {/* Status */}
        <div className="flex flex-col p-6 border border-[#999Eab]">
          <h1 className="uppercase text-xs sm:text-sm text-gray-500">Status</h1>
          <span className="px-2 py-1 text-xs sm:text-sm font-semibold bg-yellow-100 w-fit text-yellow-700 rounded">
            {statsData.status}
          </span>
        </div>

        {/* Progress */}
        <div className="flex flex-col p-6 border border-[#999Eab]">
          <h1 className="uppercase text-xs sm:text-sm text-gray-500">
            Progress
          </h1>
          <div className="flex items-center space-x-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${
                    (statsData.progress.current / statsData.progress.total) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <span className="text-xs sm:text-sm text-gray-700">
              {statsData.progress.current}/{statsData.progress.total}
            </span>
          </div>
        </div>

        {/* Reviews Completed */}
        <div className="flex flex-col p-6 border border-[#999Eab]">
          <h1 className="uppercase text-xs sm:text-sm text-gray-500">
            Reviews Completed
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            {statsData.reviewsCompleted}
          </h1>
        </div>

        {/* Total Spent */}
        <div className="flex flex-col p-6 border border-[#999Eab]">
          <h1 className="uppercase text-xs sm:text-sm text-gray-500">
            Total Spent
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            ${statsData.totalSpent.toLocaleString()}
          </h1>
        </div>

        {/* Average Rating */}
        <div className="flex flex-col p-6 border border-[#999Eab]">
          <h1 className="uppercase text-xs sm:text-sm text-gray-500">
            Average Rating
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            {statsData.averageRating}
          </h1>
        </div>

        {/* Days Remaining */}
        <div className="flex flex-col p-6 border border-[#999Eab]">
          <h1 className="uppercase text-xs sm:text-sm text-gray-500">
            Days Remaining
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            {statsData.daysRemaining}
          </h1>
        </div>
      </div>
      <CampaignPerformanceChart />
      <h1 className="mt-8 text-lg xl:text-xl">Reviews</h1>
      <AllFeedCard />
    </div>
  );
}

export default SingleCampaign;
