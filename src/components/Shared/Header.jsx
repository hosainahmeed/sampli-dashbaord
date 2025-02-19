import React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { CiCircleQuestion } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  UserOutlined,
  SettingOutlined,
  WalletOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import brandlogo from '../../assets/logo/BrandLogo.svg';
import { Link } from 'react-router-dom';

function Header() {
  const user = {
    photoURL: 'https://cdn-icons-png.flaticon.com/512/219/219988.png',
    displayName: 'Micheal Scott',
    username: '@Micheal46',
  };
  //update
  const handleSignOut = () => {
    console.log('sign out');
  };

  const menu = (
    <Menu className="w-56 rounded-xl shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <Avatar size={48} src={user?.photoURL} />
        <div>
          <h1 className="font-semibold text-base">{user?.displayName}</h1>
          <h1 className="font-normal opacity-75 text-sm">{user?.username}</h1>
        </div>
      </div>
      <Menu.Divider />
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/store-profile">Store Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<WalletOutlined />}>
        <Link to="/balance">Balance</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleSignOut}>
        Log out
      </Menu.Item>
      <div className="text-center text-gray-400 text-sm p-2">v1.10</div>
    </Menu>
  );

  return (
    <div className="px-10 border-b-[1px] border-[#eee] h-16 flex justify-between items-center">
      <img src={brandlogo} alt="brand logo" />
      <div className="flex items-center gap-4 text-2xl">
        <CiCircleQuestion />
        <Link to="/all-notifications">
          <Button shape="circle">
            <IoMdNotificationsOutline />
          </Button>
        </Link>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Avatar size={40} src={user?.photoURL} className="cursor-pointer" />
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
