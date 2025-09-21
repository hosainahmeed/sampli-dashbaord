import { Select, Skeleton } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useGetCampaignPerformanceQuery } from "../../Redux/businessApis/campaign/campaignApis";

const { Option } = Select;

function CampaignPerformanceChart() {
  const { id } = useLocation().state || {};
  const [selectedOption, setSelectedOption] = React.useState("this-year");

  const { data, isLoading } = useGetCampaignPerformanceQuery(
    { id, filter: selectedOption },
    { skip: !id }
  );

  const chartData =
    data?.data?.map((item) => ({
      name: item.label,
      spent: item.spent || 0,
      reviews: item.reviews || 0,
    })) || [];

  const valueFormatter = (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v);

  if (isLoading)
    return (
      <div className="p-4 border border-gray-200 rounded-md mt-12">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );

  return (
    <div className="border border-gray-200 p-4 rounded-md mt-12">
      {/* Header */}
      <div className="flex p-2 mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Campaign Performance</h1>
        <Select
          loading={isLoading}
          value={selectedOption}
          style={{ width: 160 }}
          onChange={setSelectedOption}
        >
          <Option value="this-week">This Week</Option>
          <Option value="this-month">This Month</Option>
          <Option value="this-year">This Year</Option>
        </Select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid horizontal vertical={false} stroke="#eee" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={valueFormatter} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: "transparent" }} formatter={(val) => val.toLocaleString()} />
          <Bar dataKey="spent" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={30} />
          <Bar dataKey="reviews" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CampaignPerformanceChart;
