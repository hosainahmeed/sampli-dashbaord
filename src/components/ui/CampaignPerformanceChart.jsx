import { Select } from "antd";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const { Option } = Select;

const data = [
  { name: "Jan 1", value: 5000 },
  { name: "Jan 2", value: 1500 },
  { name: "Jan 3", value: 4500 },
  { name: "Jan 4", value: 5500 },
  { name: "Jan 5", value: 3240 },
  { name: "Jan 6", value: 5000 },
  { name: "Jan 7", value: 1500 },
  { name: "Jan 8", value: 4500 },
  { name: "Jan 9", value: 5500 },
  { name: "Jan 10", value: 3240 },
  { name: "Jan 11", value: 5000 },
  { name: "Jan 12", value: 1500 },
  { name: "Jan 13", value: 4500 },
  { name: "Jan 14", value: 5500 },
  { name: "Jan 15", value: 3240 },
  { name: "Jan 16", value: 5000 },
  { name: "Jan 17", value: 1500 },
  { name: "Jan 18", value: 4500 },
  { name: "Jan 19", value: 5500 },
  { name: "Jan 20", value: 3240 },
  { name: "Jan 21", value: 5000 },
  { name: "Jan 22", value: 1500 },
  { name: "Jan 23", value: 4500 },
  { name: "Jan 24", value: 5500 },
  { name: "Jan 25", value: 3240 },
  { name: "Jan 26", value: 5000 },
  { name: "Jan 27", value: 1500 },
  { name: "Jan 28", value: 4500 },
  { name: "Jan 29", value: 5500 },
  { name: "Jan 30", value: 3240 },
  { name: "Jan 31", value: 5000 },
];

function CampaignPerformanceChart() {
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [filteredData, setFilteredData] = useState(data.slice(0, 7));

  const handleChange = (value) => {
    setSelectedOption(value);
    filterData(value);
  };

  const filterData = (option) => {
    let filtered = [];
    if (option === "This Week") {
      filtered = data.slice(0, 7);
    } else if (option === "This Month") {
      filtered = data.slice(0, 30);
    } else if (option === "This Year") {
      filtered = data.filter((entry, index) => index % 30 === 0);
    }
    setFilteredData(filtered);
  };

  const valueFormatter = (value) =>
    `${value / 1000}${value / 1000 === 0 ? "" : "k"}`;

  return (
    <div className="border-[1px] border-[#ccc] p-4 rounded-md mt-12">
      <div className="flex p-2 rounded-md mb-2 justify-between items-center gap-12 py-4">
        <h1 className="text-2xl">Campaign analytics</h1>
        <div className="flex items-center gap-4">
          <Select
            value={selectedOption}
            style={{ width: 160 }}
            onChange={handleChange}
          >
            <Option value="This Week">This Week</Option>
            <Option value="This Month">This Month</Option>
            <Option value="This Year">This Year</Option>
          </Select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={40} height={300} data={filteredData}>
          <CartesianGrid horizontal={true} vertical={false} stroke="#ccc" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={4}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={valueFormatter}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="value"
            fill="#2563EB"
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CampaignPerformanceChart;
