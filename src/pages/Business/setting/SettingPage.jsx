import React from 'react';
import { Tabs } from 'antd';
import Media from '../../../components/SettingComponents/Media.jsx';
import Security from '../../../components/SettingComponents/Security.jsx';
import Notification from '../../../components/SettingComponents/Notification.jsx';
import BusinessInfo from '../../../components/SettingComponents/BusinessInfo.jsx';
import General from '../../../components/SettingComponents/General.jsx';
import { TbBrandGoogleHome } from 'react-icons/tb';
import { GoDatabase, GoFileMedia } from 'react-icons/go';
import { MdOutlineSecurity } from 'react-icons/md';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const items = [
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <TbBrandGoogleHome />
        General
      </div>
    ),
    key: 'general',
    children: <General />,
  },
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <GoDatabase />
        Business Info
      </div>
    ),

    key: 'businessInfo',
    children: <BusinessInfo />,
  },
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <GoFileMedia />
        Media
      </div>
    ),
    key: 'media',
    children: <Media />,
  },
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <MdOutlineSecurity />
        Security
      </div>
    ),
    key: 'security',
    children: <Security />,
  },
  {
    label: (
      <div className="flex items-center leading-none gap-2">
        <IoIosNotificationsOutline />
        Notifications
      </div>
    ),
    key: 'notifications',
    children: <Notification />,
  },
];

function SettingPage() {
  const location = useLocation();
  const state = location.state;
  const notificationTab = state?.tab;
  return (
    <>
      <Helmet>
        <title>Sampli Business Portal || Setting</title>
      </Helmet>
      <Tabs items={items} defaultActiveKey={notificationTab || 'general'} />
    </>
  );
}

export default SettingPage;
