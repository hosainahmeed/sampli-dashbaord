import React, { useState } from "react";
import { Button } from "antd";
import {
  ClockCircleOutlined,
  StarOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetSingleBusinessProfileQuery } from "../../../../Redux/sampler/businessProfileApis";

const StoreProfileSampler = ({ businessId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: getBusinessProfile } = useGetSingleBusinessProfileQuery({
    id: businessId,
  });
  const storeInfo = getBusinessProfile?.data;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
            <img
              src={storeInfo?.logo}
              alt={storeInfo?.bussinessName}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-semibold">{storeInfo?.bussinessName}</h1>
        </div>
        <div className="flex gap-3">
          <Button className="text-gray-600 border-gray-300">
            Follow store
          </Button>
          {/* <Link to={"/store-profile"}>
            <Button type="primary" className="bg-blue-500">
              Visit Store
            </Button>
          </Link> */}
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
        {/* <div className="flex items-center gap-2">
          <ClockCircleOutlined />
          <span>
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(storeInfo?.createdAt))}
          </span>
        </div> */}
        {/* <div className="flex items-center gap-2">
          <StarOutlined />
          <span>{storeInfo?.feedback}</span>
        </div> */}
        <div className="flex items-center gap-2">
          <PhoneOutlined />
          <span>{storeInfo?.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <MailOutlined />
          <span>{storeInfo?.email}</span>
        </div>
      </div>

      <div className="relative">
        <p
          className={`text-gray-600 leading-relaxed ${
            !isExpanded ? "line-clamp-3" : ""
          }`}
        >
          {storeInfo?.bio}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 mt-2 text-sm font-medium cursor-pointer"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default StoreProfileSampler;
