import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  ShoppingOutlined,
  HeartOutlined,
  StarOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const SidebarHome = () => {
  return (
    <Sider width={'100%'} className="p-0">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/sampler/my-profile">My Profile</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SettingOutlined className='animate-spin' />}>
          <Link to="/sampler/settings/basic-details-settings-sampler">Settings</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShoppingOutlined />}>
          <Link to="/sampler/campaign/shipments/offer-shipments">My Orders</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<HeartOutlined />}>
          <Link to="/sampler/campaign/shipments/wishlist">Wishlist</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<StarOutlined />}>
          <Link to="/sampler/my-profile">My Reviews</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<MoneyCollectOutlined />}>
          <Link to="/sampler/campaign/earnings">My Earnings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarHome;