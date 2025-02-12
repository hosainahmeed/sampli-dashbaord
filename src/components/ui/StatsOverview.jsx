import React from "react";

function StatsOverview() {
  const statsData = {
    totalCampaigns: 32,
    totalSpent: 12450,
    activeCampaigns: 12,
    averageRating: 4.3,
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border border-[#dadada] rounded-3xl overflow-hidden">
      {Object.keys(statsData).map((key) => (
        <div
          key={key}
          className="flex p-8 border-r border-[#999Eab] flex-col items-start justify-center text-[#111] cursor-pointer transition-all"
        >
          <h1 className="uppercase text-xs xl:text-sm">{key}</h1>
          <h1 className="sm:text-xl xl:text-4xl font-semibold">
            {statsData.totalSpent ? "$" + statsData[key] : statsData[key]}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default StatsOverview;

