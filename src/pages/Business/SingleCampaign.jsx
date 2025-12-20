import React, { useCallback } from "react";
import { Button, Card, Progress, Tooltip } from "antd";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CampaignPerformanceChart from "../../components/ui/CampaignPerformanceChart";
import AllFeedCard from "../../components/page-Component/AllFeedCard";
import {
  useChangeCampaignStatusMutation,
  useGetCampaignSummaryQuery,
} from "../../Redux/businessApis/campaign/campaignApis";

function SingleCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: campaignSummary,
    isLoading: campaignLoading,
  } = useGetCampaignSummaryQuery(id, { skip: !id });
  const [changeCampaignStatus, { isLoading: statusChanging }] =
    useChangeCampaignStatusMutation();

  const campaign = campaignSummary?.data;


  const handleBack = () => navigate(-1);
  const handleEdit = () =>
    navigate("/campaign/single-campaign/edit-campaign", { state: { id } });

  const handleStatusChange = useCallback(
    async (newStatus) => {
      try {
        const res = await changeCampaignStatus({
          id,
          data: { status: newStatus },
        }).unwrap();
        if (res?.success) toast.success(res.message);
      } catch (error) {
        toast.error(
          error?.data?.message || error.message || "Failed to update campaign"
        );
      }
    },
    [changeCampaignStatus, id]
  );


  const StatCard = React.memo(({ label, children }) => (
    <div className="flex flex-col p-6 gap-3 border border-[#999Eab]">
      <h1 className="uppercase text-xs sm:text-sm text-gray-500">{label}</h1>
      <div className="text-lg lg:text-2xl font-semibold">{children}</div>
    </div>
  ));

  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex items-center gap-2 text-[#999Eab] cursor-pointer hover:text-[#111] transition-all"
        onClick={handleBack}
      >
        <FaAngleLeft />
        <span className="!mt-1">Back to campaign</span>
      </div>

      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between">
        <h1 className="text-2xl xl:text-4xl font-bold mt-6">{campaign?.name}</h1>
        <div className="flex items-center gap-3 mt-4 xl:mt-0">
          <Button loading={campaignLoading} onClick={handleEdit}>Edit Campaign</Button>
          {campaign?.status !== "Scheduled" && <Button
            loading={statusChanging || campaignLoading}
            onClick={() =>
              handleStatusChange(
                campaign?.status === "Active" ? "Paused" : "Active"
              )
            }
            danger={campaign?.status === "Active"}
            type={campaign?.status === "Active" ? "default" : "primary"}
          >
            {campaign?.status === "Active" ? "Pause Campaign" : "Resume Campaign"}
          </Button>}
        </div>
      </div>

      {campaignLoading ?
        <Card loading />
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-200 rounded-3xl overflow-hidden">
          <StatCard label="Timeline">
            <Tooltip title="Start Date"><span>{new Date(campaign?.timeline?.startDate).toLocaleDateString("default", {
              month: "short",
              day: "numeric",
            })}{" "}
              -{" "}</span>
            </Tooltip>
            <Tooltip title="End Date">
              <span>{new Date(campaign?.timeline?.endDate).toLocaleDateString("default", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}</span>
            </Tooltip>
          </StatCard>

          <StatCard label="Budget">
            <span className="xl:text-sm text-xs text-[#6D7486]">
              <Tooltip title="Budget Spent"><span className='text-black text-lg lg:text-2xl'>{(campaign?.budget?.spent).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span></Tooltip>{" "}
              of{" "}
              <Tooltip title="Budget Total"><span className='text-black text-lg lg:text-2xl'>{(campaign?.budget?.total).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span></Tooltip>
            </span>
          </StatCard>

          <StatCard label="Status">
            <span className="px-2 py-1 text-xs sm:text-sm font-semibold bg-yellow-100 text-yellow-700 rounded">
              {campaign?.status}
            </span>
          </StatCard>

          <StatCard label="Progress">
            <Progress
              percent={(campaign?.progress?.completed / campaign?.progress?.target) * 100}
              format={() =>
                `${campaign?.progress?.completed}/${campaign?.progress?.target}`
              }
            />
          </StatCard>

          <StatCard label="Reviews Completed">
            {campaign?.totals?.reviewsCompleted ?? 0}
          </StatCard>

          <StatCard label="Total Spent">
            <span className="text-[#6D7486]">$</span>
            {campaign?.totals?.totalSpent?.toLocaleString() ?? 0}
          </StatCard>

          <StatCard label="Average Rating">
            {campaign?.totals?.averageRating ?? "N/A"}
          </StatCard>

          <StatCard label="Days Remaining">{campaign?.daysRemaining ?? 0}</StatCard>
        </div>}

      <CampaignPerformanceChart />
      <AllFeedCard />
    </div>
  );
}

export default SingleCampaign;
