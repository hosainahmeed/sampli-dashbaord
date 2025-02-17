import React from 'react'
import { Menu, Avatar, Badge } from 'antd'
import { BellOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from '../../../components/ui/Logo'
import { MdOutlineCampaign } from 'react-icons/md'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2 text-2xl ">
        <Logo />
      </div>

      {/* Navigation Links */}
      <Menu mode="horizontal" className="border-none">
        <Menu.Item key="campaign" className="text-blue-600 font-medium">
          <Link to="/campaign">
            <MdOutlineCampaign />
            Campaign
          </Link>
        </Menu.Item>
        <Menu.Item key="feed" disabled>
          <Link to="/feed">
            <span role="img" aria-label="feed">
              📡
            </span>{' '}
            Feed
          </Link>
        </Menu.Item>
        <Menu.Item key="shop" disabled>
          <Link to="/shop">
            <span role="img" aria-label="shop">
              🛍️
            </span>{' '}
            Shop
          </Link>
        </Menu.Item>
      </Menu>

      {/* Icons and Profile */}
      <div className="flex items-center space-x-4">
        <Badge dot>
          <ShoppingCartOutlined className="text-xl text-gray-500" />
        </Badge>
        <Badge count={1}>
          <BellOutlined className="text-xl text-gray-500" />
        </Badge>
        <Avatar src="/user.jpg" size={32} />
      </div>
    </div>
  )
}

export default Navbar
