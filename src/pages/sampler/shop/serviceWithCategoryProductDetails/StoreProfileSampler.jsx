import React, { useState } from "react";
import { Button } from "antd";
import {
  ClockCircleOutlined,
  StarOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../../../../Redux/businessApis/business _profile/getprofileApi";

const StoreProfileSampler = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: getBusinessProfile } = useGetProfileQuery();

  

  const storeInfo = {
    name: "Focus Camera",
    logo: `https://picsum.photos/seed/200/300`,
    joinDate: "Feb 2022",
    feedback: "99% positive feedback",
    phone: "+123 456 7890",
    email: "Focuscamera@info.com",
    description: `It all started with a little camera shop in Brooklyn. Founded by Abe Berkowitz in 1966, Focus has faithfully served the New York City Metropolitan Area for over half a century. In that time, we've built a tight knit community of photographers, videographers, musicians, and other creators passionate about reaching their goals.Today we have two retail store locations, hundreds of employees, and millions of customers from around the world, whom we reach through our award-winning website. However, our mission remains the same: to help creators find the gear they need to realize their vision.`,
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
            <img
              src={storeInfo.logo}
              alt={storeInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-semibold">{storeInfo.name}</h1>
        </div>
        <div className="flex gap-3">
          <Button className="text-gray-600 border-gray-300">
            Follow store
          </Button>
          <Link to={"/store-profile"}>
            <Button type="primary" className="bg-blue-500">
              Visit Store
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <ClockCircleOutlined />
          <span>Joined {storeInfo.joinDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <StarOutlined />
          <span>{storeInfo.feedback}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneOutlined />
          <span>{storeInfo.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MailOutlined />
          <span>{storeInfo.email}</span>
        </div>
      </div>

      <div className="relative">
        <p
          className={`text-gray-600 leading-relaxed ${
            !isExpanded ? "line-clamp-3" : ""
          }`}
        >
          {storeInfo.description}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 mt-2 text-sm font-medium"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default StoreProfileSampler;
