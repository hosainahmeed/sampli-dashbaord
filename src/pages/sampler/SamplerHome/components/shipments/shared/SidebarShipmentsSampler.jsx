import React from 'react'
import { NavLink } from 'react-router-dom'
import { GrDocumentText, GrFavorite } from 'react-icons/gr'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdOutlineLocalOffer } from 'react-icons/md'

const SidebarShipmentsSampler = () => {
  const menuItems = [
    {
      name: 'Offer shipments',
      link: '/sampler/campaign/shipments/offer-shipments',
      icon: <MdOutlineLocalOffer className="transform scale-x-[-1]" />,
    },
    {
      name: 'My purchases',
      link: '/sampler/campaign/shipments/my-purchases',
      icon: <GrDocumentText />,
    },
    {
      name: 'Wishlist',
      link: '/sampler/campaign/shipments/wishlist',
      icon: <GrFavorite />,
    },
    {
      name: 'Notifications',
      link: '/sampler/campaign/shipments/notifications',
      icon: <IoMdNotificationsOutline />,
    },
  ]
  return (
    <div className="responsive-width">
      <div className=" max-w-[250px] w-full h-[96vh] px-3 bg-white  ">
        <div className=" text-xl mb-5 pl-6">Shopping & Alerts</div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              to={item?.link}
              key={index}
              className={({ isActive }) =>
                `flex items-center text-sm py-3 rounded-3xl my-1 pl-6 hover:bg-gray-500 cursor-pointer hover:text-white ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`
              }
            >
              <span className={`mr-4 text-xl `}>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SidebarShipmentsSampler
