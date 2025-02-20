import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosNotifications } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { BsDatabase } from 'react-icons/bs'
import { MdOutlineSecurity } from 'react-icons/md'

const SidebarSettings = () => {
  const menuItems = [
    {
      name: 'Basic details',
      link: '/sampler/settings/basic-details-settings-sampler',
      icon: <FaRegUser />,
    },
    {
      name: 'Preferences',
      link: '/sampler/settings/preferences-settings-sampler',
      icon: <BsDatabase />,
    },
    {
      name: 'Security',
      link: '/sampler/settings/security-settings-sampler',
      icon: <MdOutlineSecurity />,
    },
    {
      name: 'Notifications',
      link: '/sampler/settings/notifications-settings-sampler',
      icon: <IoIosNotifications />,
    },
  ]
  return (
    <div className="responsive-width">
      <div className=" max-w-[250px] w-full h-[96vh] px-3 bg-white  ">
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

export default SidebarSettings
