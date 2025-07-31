import React, { useState } from 'react';
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
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { Button } from 'antd';

const Bottombar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const adminMenus = [
    {
      icon:
        location?.pathname === '/' ? (
          <img className="w-5 h-5" src={activeHome} alt="home"></img>
        ) : (
          <img className="w-5 h-5" src={homeIcon} alt="home"></img>
        ),
      path: '/',
    },
    {
      icon:
        location?.pathname === '/campaign' ? (
          <img className="w-5 h-5" src={activeCampaignIcon} alt="home"></img>
        ) : (
          <img className="w-5 h-5" src={campaignIcon} alt="home"></img>
        ),
      path: '/campaign',
    },
    {
      icon:
        location?.pathname === '/product' ? (
          <img className="w-5 h-5" src={activeProductIcon} alt="home"></img>
        ) : (
          <img className="w-5 h-5" src={productIcon} alt="home"></img>
        ),
      path: '/product',
    },
    {
      icon:
        location?.pathname === '/sales' ? (
          <img className="w-5 h-5" src={activeSales} alt="order"></img>
        ) : (
          <img className="w-5 h-5" src={salse} alt="order"></img>
        ),
      path: '/sales',
    },
    {
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
    <div>
      {!open && (
        <Button
          shape="circle"
          onClick={() => setOpen(!open)}
          className="!fixed !bottom-4 !right-4 !flex xl:!hidden !justify-center !items-center !bg-[#f8f8fa]  !border-t !border-gray-200 !z-[999]"
        >
          <MdOutlineKeyboardArrowUp className="!text-xl" />
        </Button>
      )}
      {open && (
        <div className="fixed bottom-0 left-0 right-0 flex xl:hidden justify-around items-center bg-[#f8f8fa] p-4 border-t border-gray-200 z-50">
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
              {item?.icon}
            </NavLink>
          ))}
          <Button shape="circle" onClick={() => setOpen(!open)}>
            <MdKeyboardArrowDown className="!text-xl" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Bottombar;
