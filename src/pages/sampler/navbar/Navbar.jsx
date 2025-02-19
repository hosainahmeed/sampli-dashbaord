import React from "react";
import { Menu, Avatar, Badge } from "antd";
import { BellOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../components/ui/Logo";
import { MdOutlineCampaign, MdRssFeed } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="flex justify-between items-center p-4 responsive-width">
      {/* Logo */}
      <div className="flex items-center space-x-2 text-2xl">
        <Logo />
      </div>

      {/* Navigation Links */}
      <div className=" flex items-center justify-center">
        <div key="/sampler/campaign">
          <Link
            to="/sampler/campaign"
            className={`flex items-center justify-center gap-1 px-7 py-2 ${
              location.pathname === "/sampler/campaign"
                ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                : "text-gray-500"
            }`}
          >
            <MdOutlineCampaign />
            Campaign
          </Link>
        </div>

        <div key="/feed">
          <Link
            to="/feed"
            className={`flex items-center justify-center gap-1 px-7 py-2 ${
              location.pathname === "/feed"
                ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                : "text-gray-500"
            }`}
          >
            <MdRssFeed />
            Feed
          </Link>
        </div>

        <div key="/shop">
          <Link
            to="/shop"
            className={`flex items-center justify-center gap-1 px-7 py-2 ${
              location.pathname === "/shop"
                ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                : "text-gray-500"
            }`}
          >
            <AiOutlineShopping />
            Shop
          </Link>
        </div>
      </div>

      {/* Icons and Profile */}
      <div className="flex items-center space-x-4 justify-center gap-5">
        <Badge dot>
          <ShoppingCartOutlined className="text-xl text-gray-500" />
        </Badge>
        <Badge count={1}>
          <BellOutlined className="text-xl text-gray-500" />
        </Badge>
        <Avatar
          src={`https://i.pravatar.cc/32?u=${Math.floor(Math.random() * 1000)}`}
          size={40}
        />
      </div>
    </div>
  );
};

export default Navbar;
