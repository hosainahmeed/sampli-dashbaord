import { NavLink, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BiSolidOffer } from 'react-icons/bi'
import { PiUsersFourFill } from 'react-icons/pi'

const Sidebar = () => {
  const menuItems = [
    {
      name: 'Offer shipments',
      link: '/sampler/shipments/offer-shipments',
      icon: <PiUsersFourFill />,
    },
    {
      name: 'My purchases',
      link: '/sampler/shipments/my-purchases',
      icon: <BiSolidOffer />,
    },
    {
      name: 'Wishlist',
      link: '/sampler/shipments/wishlist',
      icon: <BiSolidOffer />,
    },
    {
      name: 'Notifications',
      link: '/sampler/shipments/notifications',
      icon: <CgProfile />,
    },
  ]
  const Navigate = useNavigate()
  return (
    <div className=" w-[250px] h-[96vh] overflow-y-scroll px-3 bg-white  ">
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            to={item?.link}
            key={index}
            className={({ isActive }) =>
              `flex items-center text-sm py-3 rounded-3xl my-1 pl-6 hover:bg-[#0033A0] cursor-pointer hover:text-white ${
                isActive ? 'bg-[#0033A0] text-white' : ''
              }`
            }
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
