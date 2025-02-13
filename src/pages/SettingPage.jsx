import React, { useState } from "react";
import { Button, Tabs } from "antd";
import General from "../components/SettingComponents/General";
import Media from "../components/SettingComponents/Media";
import Security from "../components/SettingComponents/Security";
import Notification from "../components/SettingComponents/Notification.jsx";
import BusinessInfo from "../components/SettingComponents/BusinessInfo.jsx";

const items = [
  {
    label: "General",
    key: "general",
    // children: <General />,
    children:  <Security />,
  },
  {
    label: "Business Info",
    key: "businessInfo",
    children: <BusinessInfo />,
  },
  {
    label: "Media",
    key: "media",
    children: <Media />,
  },
  {
    label: "Security",
    key: "security",
    children: <Security />,
  },
  {
    label: "Notifications",
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
