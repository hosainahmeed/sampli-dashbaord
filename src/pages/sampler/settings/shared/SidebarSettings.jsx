import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosNotifications } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { BsDatabase } from 'react-icons/bs'
import { MdOutlineSecurity } from 'react-icons/md'
import { HiMenu, HiX } from 'react-icons/hi'

const SidebarSettings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

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

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <div className="responsive-width relative">
      {isMobile && (
        <button
          className="fixed z-40 top-20 left-4 bg-white p-2 rounded-full shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      )}

      <div
        className={`fixed md:relative z-30 h-screen transition-all duration-300 ease-in-out ${
          isOpen
            ? 'translate-x-0 w-64'
            : '-translate-x-full w-0 md:translate-x-0 md:w-16'
        }`}
      >
        <div className="h-full bg-white bg-opacity-90 backdrop-blur-sm">
          <div
            className={`text-2xl mb-5 pl-6 py-4 transition-opacity duration-200 ${
              isOpen ? 'opacity-100' : 'opacity-0 md:opacity-0'
            }`}
          >
            Settings
          </div>

          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <NavLink
                to={item?.link}
                key={index}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center text-sm py-3 rounded-3xl my-1 ${
                    isOpen ? 'pl-6' : 'justify-center'
                  } hover:bg-gray-500 cursor-pointer hover:text-white   ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`
                }
              >
                <span
                  className={`text-xl hover:text-blue-600 ${
                    isOpen ? 'mr-4' : ''
                  }`}
                >
                  {item.icon}
                </span>
                {isOpen && (
                  <span className=" ">{item.name}</span>
                )}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>

      <div className={`md:block ${isOpen ? 'ml-64' : 'ml-16'} hidden`}></div>
    </div>
  )
}

export default SidebarSettings
