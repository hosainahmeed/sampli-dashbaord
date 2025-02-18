import React from 'react'
import { NavLink } from 'react-router-dom'
import { BiSolidOffer, BiSolidPurchaseTag } from 'react-icons/bi'
import { GrFavorite } from 'react-icons/gr'
import { IoIosNotifications } from 'react-icons/io'

const SidebarShipmentsSampler = () => {
  const menuItems = [
    {
      name: 'Offer shipments',
      link: '/sampler/campaign/shipments/offer-shipments',
      icon: <BiSolidOffer />,
    },
    {
      name: 'My purchases',
      link: '/sampler/campaign/shipments/my-purchases',
      icon: <BiSolidPurchaseTag />,
    },
    {
      name: 'Wishlist',
      link: '/sampler/campaign/shipments/wishlist',
      icon: <GrFavorite />,
    },
    {
      name: 'Notifications',
      link: '/sampler/campaign/shipments/notifications',
      icon: <IoIosNotifications />,
    },
  ]
  return (
    <div className="responsive-width">
      <div className=" w-[250px] h-[96vh] px-3 bg-white  ">
        <div className=" text-2xl mb-5">Shopping & Alerts</div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              to={item?.link}
              key={index}
              className={({ isActive }) =>
                `flex items-center text-sm py-3 rounded-3xl my-1 pl-6 hover:bg-gray-500 cursor-pointer hover:text-white ${
                  isActive ? 'text-black' : 'text-gray-500'
                }`
              }
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SidebarShipmentsSampler
