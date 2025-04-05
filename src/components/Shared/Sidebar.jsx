import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import homeIcon from '../../assets/icons/home.svg';
import activeHome from '../../assets/icons/active/activeHome.svg';
import campaignIcon from '../../assets/icons/cam.svg';
import activeCampaignIcon from '../../assets/icons/active/activeCam.svg';
import productIcon from '../../assets/icons/prouct.svg';
import activeProductIcon from '../../assets/icons/active/Product.svg';
import salse from '../../assets/icons/salse.svg';
import activeSales from '../../assets/icons/active/activeSales.svg';
import activeSetting from '../../assets/icons/active/activeSetting.svg';
import settingIcon from '../../assets/icons/setting.svg';

const Sidebar = () => {
  const location = useLocation();
  const adminMenus = [
    {
      name: 'Dashboard',
      icon:
        location?.pathname === '/' ? (
          <img className="w-5 h-5" src={activeHome} alt="home"></img>
        ) : (
          <img className="w-5 h-5" src={homeIcon} alt="home"></img>
        ),
      path: '/',
    },
    {
      name: 'Campaign',
      icon:
        location?.pathname === '/campaign' ? (
          <img className="w-5 h-5" src={activeCampaignIcon} alt="home"></img>
        ) : (
          <img className="w-5 h-5" src={campaignIcon} alt="home"></img>
        ),
      path: '/campaign',
    },
    {
      name: 'Product',
      icon:
        location?.pathname === '/product' ? (
          <img className="w-5 h-5" src={activeProductIcon} alt="home"></img>
        ) : (
          <img className="w-5 h-5" src={productIcon} alt="home"></img>
        ),
      path: '/product',
    },
    {
      name: 'Order',
      icon:
        location?.pathname === '/sales' ? (
          <img className="w-5 h-5" src={activeSales} alt="order"></img>
        ) : (
          <img className="w-5 h-5" src={salse} alt="order"></img>
        ),
      path: '/sales',
    },
    {
      name: 'Settings',
      icon:
        location?.pathname === '/settings' ? (
          <img className="w-5 h-5" src={activeSetting} alt="home"></img>
        ) : (
          <img className="w-5 h-5" src={settingIcon} alt="home"></img>
        ),
      path: '/settings',
    },
  ];
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
          {item?.icon} <span className="">{item?.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
