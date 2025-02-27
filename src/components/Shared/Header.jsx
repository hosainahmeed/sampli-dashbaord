import React, { useState, useEffect } from 'react'
import { Avatar, Button, Dropdown, Menu } from 'antd'
import { CiHeart, CiStar } from 'react-icons/ci'
import { IoMdNotificationsOutline } from 'react-icons/io'
import {
  UserOutlined,
  SettingOutlined,
  WalletOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import brandlogo from '../../assets/logo/BrandLogo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { GrNotes } from 'react-icons/gr'
import {
  MdOutlineAttachMoney,
  MdOutlineCampaign,
  MdRssFeed,
} from 'react-icons/md'
import { LuShoppingCart } from 'react-icons/lu'
import ShoppingCartSampler from '../../pages/sampler/shoppingCartSampler/ShoppingCartSampler'

function Header() {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('sampler') // sampler, business
  const user = {
    photoURL: 'https://cdn-icons-png.flaticon.com/512/219/219988.png',
    displayName: 'Micheal Scott',
    username: '@Micheal46',
  }
  //update
  const handleSignOut = () => {
    toast.success('sigh out successfully!')
    navigate('/login')
    console.log('sign out')
  }

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
        <Link to="/business/transaction-balance">Balance</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleSignOut}>
        Log out
      </Menu.Item>
      <div className="text-center text-gray-400 text-sm p-2">v1.10</div>
    </Menu>
  )
  const menuSampler = (
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
        <Link to="/sampler/my-profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        <Link to="/sampler/settings/basic-details-settings-sampler">
          Settings
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<GrNotes />}>
        <Link to="/sampler/campaign/shipments/offer-shipments">My orders</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<CiHeart />}>
        <Link to="/sampler/campaign/shipments/wishlist">Wishlist</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<CiStar />}>
        <Link to="/sampler/my-profile">My Reviews</Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<MdOutlineAttachMoney />}>
        <Link to="/sampler/campaign/earnings">My earnings</Link>
      </Menu.Item>
      <Menu.Item key="7" icon={<LogoutOutlined />} onClick={handleSignOut}>
        Log out
      </Menu.Item>
    </Menu>
  )

  const location = useLocation()
  const getLinkClass = (path) => location.pathname === path && 'text-blue-600'

  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      console.log(currentScrollPos)
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <div>
      {userType == 'business' ? (
        <div className="px-10 border-b-[1px] border-[#eee] h-16 flex justify-between items-center">
          <Link to={'/'}>
            <img src={brandlogo} alt="brand logo" />
          </Link>
          <div className="flex items-center gap-4 text-2xl">
            {/* <CiCircleQuestion /> */}
            <Link
              to="/all-notifications"
              className="hover:scale-120 transition-all  "
            >
              <Button shape="circle">
                <IoMdNotificationsOutline />
              </Button>
            </Link>
            <Dropdown
              overlay={menu}
              trigger={['click']}
              placement="bottomRight"
            >
              <Avatar
                size={40}
                src={user?.photoURL}
                className="cursor-pointer hover:scale-110 transition-all"
              />
            </Dropdown>
          </div>
        </div>
      ) : (
        <div
          className={`fixed w-full top-0 left-0 z-50 transition-transform duration-300 ${
            visible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="px-10 border-b-[1px] border-[#eee] h-16 flex justify-between items-center bg-white">
            <Link to={'/sampler/campaign'}>
              <img src={brandlogo} alt="brand logo" />
            </Link>
            <div className="flex gap-20 text-gray-600">
              <Link
                to={'/sampler/campaign'}
                className={`hover:text-black transition-all ${getLinkClass(
                  '/sampler/campaign'
                )}`}
              >
                <div className="flex gap-2">
                  <MdOutlineCampaign className="text-[19px]" />
                  Campaign
                </div>
              </Link>
              <Link
                to={'/sampler/feed'}
                className={`hover:text-black transition-all ${getLinkClass(
                  '/sampler/feed'
                )}`}
              >
                <div className="flex gap-2">
                  <MdRssFeed />
                  Feed
                </div>
              </Link>
              <Link
                to={'/sampler/shop'}
                className={`hover:text-black transition-all ${getLinkClass(
                  '/sampler/shop'
                )}`}
              >
                <div className="flex gap-2">
                  <LuShoppingCart />
                  Shop
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-6 text-2xl">
              <Link
                to="/sampler/checkout"
                className="hover:scale-110 transition-all"
              >
                <ShoppingCartSampler />
              </Link>
              <Link
                to="/sampler/campaign/shipments/notifications"
                className="hover:scale-110 transition-all"
              >
                <IoMdNotificationsOutline className="hover:text-black text-gray-600 transition-all" />
              </Link>
              <Dropdown
                overlay={menuSampler}
                trigger={['click']}
                placement="bottomRight"
              >
                <Avatar
                  size={40}
                  src={user?.photoURL}
                  className="cursor-pointer hover:scale-110 transition-all"
                />
              </Dropdown>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
