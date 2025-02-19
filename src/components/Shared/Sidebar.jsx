import React from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { IoHome, IoPricetagOutline } from 'react-icons/io5';
import { NavLink, useLocation } from 'react-router-dom';
import order from '../../assets/logo/order.svg';
// menus link
const adminMenus = [
  {
    name: 'Dashboard',
    icon: <IoHome className="text-xl" />,
    path: '/',
  },
  {
    name: 'Campaign',
    icon: <IoPricetagOutline className="text-xl" />,
    path: '/campaign',
  },
  {
    name: 'Product',
    icon: <AiOutlineProduct className="text-xl" />,
    path: '/product',
  },
  {
    name: 'Order',
    icon: <img src={order} alt="order"></img>,
    path: '/sales',
  },
  {
    name: 'Settings',
    icon: <CiSettings className="text-xl" />,
    path: '/settings',
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="scrollbar h-full overflow-y-scroll space-y-6 p-3">
      {adminMenus?.map((item) => (
        <NavLink
          key={item?.path}
          className={`${
            location?.pathname === item?.path
              ? 'sidebar-button-active'
              : 'sidebar-button'
          } text-base  hover:scale-101 transition-all`}
          to={item?.path}
        >
          {item?.icon} {item?.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
