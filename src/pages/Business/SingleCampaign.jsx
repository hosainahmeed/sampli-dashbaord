import React from 'react';
import { Button, Card } from 'antd';
import { FaAngleLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import CampaignPerformanceChart from '../../components/ui/CampaignPerformanceChart';
import AllFeedCard from '../../components/page-Component/AllFeedCard';
import toast from 'react-hot-toast';
import { useChangeCampaignStatusMutation, useGetCampaignByIdQuery } from '../../Redux/businessApis/campaign/campaignApis';
import { useGetAllReviewQuery } from '../../Redux/sampler/reviewApis';

function SingleCampaign() {
  const { id } = useLocation().state;
  console.log(id)
  const navigate = useNavigate();
  const [changeCampaignStatus, { isLoading: changeCampaignStatusLoading }] = useChangeCampaignStatusMutation();
  const { data: campaignByIdData, isLoading: campaignByIdLoading } = useGetCampaignByIdQuery(id);

  const { data: reviewList, isLoading: reviewLoading } = useGetAllReviewQuery({
    productId: id,
  });
  console.log(reviewList)
  
  const statsData = {
    timeline: new Date(campaignByIdData?.data?.startDate).toLocaleString('default', {
      month: 'short',
      day: 'numeric',
    }) + ' - ' + new Date(campaignByIdData?.data?.endDate).toLocaleString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    budget: { spent: 25000, total: 100000 },
    status: campaignByIdData?.data?.status,
    progress: { current: 10, total: 300 },
    reviewsCompleted: 32,
    totalSpent: 12450,
    averageRating: 4.3,
    daysRemaining: 12,
  };

  const handleCampaignEdit = () => {
    navigate('/campaign/single-campaign/edit-campaign', { state: { id } });
  };

  const handlePauseCampaign = async () => {
    try {
      await changeCampaignStatus({ id, data: { status: 'Paused' } }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        }
      })
    } catch (error) {
      toast.error(error?.data?.message || error.message || 'Failed to pause campaign');
    }
  };
  const handleResumeCampaign = async () => {
    try {
      await changeCampaignStatus({ id, data: { status: 'Active' } }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        }
      })
    } catch (error) {
      toast.error(error?.data?.message || error.message || 'Failed to resume campaign');
    }
  };

  if (campaignByIdLoading) return <div className="container mx-auto">
    <Card loading />
  </div>;
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
            loading={changeCampaignStatusLoading}
            onClick={() => {
              campaignByIdData?.data?.status === 'Active' ? handlePauseCampaign() : handleResumeCampaign()
            }}
            style={{ color: campaignByIdData?.data?.status === 'Active' ? 'red' : 'green' }}
          >
            {campaignByIdData?.data?.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#999Eab] rounded-3xl overflow-hidden">
        {/* Timeline */}
        <div className="flex flex-col p-6 gap-4 border border-[#999Eab]">
          <h1 className="uppercase  text-xs xl:text-sm text-gray-500">
            Timeline
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            {statsData.timeline}
          </h1>
        </div>

        {/* Budget */}
        <div className="flex flex-col p-6 gap-4 border border-[#999Eab]">
          <h1 className="uppercase  text-xs sm:text-sm text-gray-500">Budget</h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            <span className="text-[#6D7486]">$</span>
            {statsData.budget.spent.toLocaleString()} of $
            {statsData.budget.total.toLocaleString()}
          </h1>
        </div>

        {/* Status */}
        <div className="flex flex-col p-6 gap-4 border border-[#999Eab]">
          <h1 className="uppercase  text-xs sm:text-sm text-gray-500">Status</h1>
          <span className="px-2 py-1 text-xs sm:text-sm font-semibold bg-yellow-100 w-fit text-yellow-700 rounded">
            {statsData.status}
          </span>
        </div>

        {/* Progress */}
        <div className="flex flex-col p-6 gap-4 border border-[#999Eab]">
          <h1 className="uppercase  text-xs sm:text-sm text-gray-500">
            Progress
          </h1>
          <div className="flex items-center space-x-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${(statsData.progress.current / statsData.progress.total) *
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
        <div className="flex flex-col p-6 gap-4 border border-[#999Eab]">
          <h1 className="uppercase  text-xs sm:text-sm text-gray-500">
            Reviews Completed
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            {statsData.reviewsCompleted}
          </h1>
        </div>

        {/* Total Spent */}
        <div className="flex flex-col p-6 gap-4 border border-[#999Eab]">
          <h1 className="uppercase  text-xs sm:text-sm text-gray-500">
            Total Spent
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            <span className="text-[#6D7486]">$</span>
            {statsData.totalSpent.toLocaleString()}
          </h1>
        </div>

        {/* Average Rating */}
        <div className="flex flex-col p-6 gap-4 border border-[#999Eab]">
          <h1 className="uppercase  text-xs sm:text-sm text-gray-500">
            Average Rating
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            {statsData.averageRating}
          </h1>
        </div>

        {/* Days Remaining */}
        <div className="flex flex-col p-6 gap-4 border border-[#999Eab]">
          <h1 className="uppercase  text-xs sm:text-sm text-gray-500">
            Days Remaining
          </h1>
          <h1 className="text-xs xl:text-lg font-semibold">
            {statsData.daysRemaining}
          </h1>
        </div>
      </div>
      <CampaignPerformanceChart />

      <AllFeedCard />
    </div>
  );
}

export default SingleCampaign;
