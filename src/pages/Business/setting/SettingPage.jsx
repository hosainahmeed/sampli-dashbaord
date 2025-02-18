import React, { useState } from "react";
import { Button, Tabs } from "antd";
import Media from "../../../components/SettingComponents/Media.jsx";
import Security from "../../../components/SettingComponents/Security.jsx";
import Notification from "../../../components/SettingComponents/Notification.jsx";
import BusinessInfo from "../../../components/SettingComponents/BusinessInfo.jsx";
import General from "../../../components/SettingComponents/General.jsx";
import { TbBrandGoogleHome } from "react-icons/tb";
import { GoDatabase, GoFileMedia } from "react-icons/go";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";

const items = [
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <TbBrandGoogleHome />
        General
      </div>
    ),
    key: "general",
    children: <General />,
    // children:  <Security />,
  },
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <GoDatabase />
        Business Info
      </div>
    ),

    key: "businessInfo",
    children: <BusinessInfo />,
  },
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <GoFileMedia />
        Media
      </div>
    ),
    key: "media",
    children: <Media />,
  },
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <MdOutlineSecurity />
        Security
      </div>
    ),
    key: "security",
    children: <Security />,
  },
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <IoIosNotificationsOutline />
        Notifications
      </div>
    ),
    key: "notifications",
    children: <Notification />,
  },
];

function SettingPage() {
  return (
    <>
      <Tabs items={items} />
    </>
  );
}

export default SettingPage;
