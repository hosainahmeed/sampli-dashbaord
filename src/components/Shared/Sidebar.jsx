import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { CiLogout, CiSettings } from "react-icons/ci";
import { FcSalesPerformance } from "react-icons/fc";
import { IoHome, IoPricetagOutline } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// menus link
const adminMenus = [
  {
    name: "Dashboard",
    icon: <IoHome className="text-xl" />,
    path: "/",
  },
  {
    name: "Campaign",
    icon: <IoPricetagOutline className="text-xl" />,
    path: "/campaign",
  },
  {
    name: "Product",
    icon: <AiOutlineProduct className="text-xl" />,
    path: "/product",
  },
  {
    name: "Sales",
    icon: <FcSalesPerformance className="text-xl" />,
    path: "/sales",
  },
  {
    name: "Settings",
    icon: <CiSettings className="text-xl" />,
    path: "/settings",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    console.log("logout");
  };
  return (
    <div className="scrollbar h-full overflow-y-scroll space-y-6 p-3">
      {adminMenus?.map((item) => (
        <NavLink
          key={item?.path}
          className={`${
            location?.pathname === item?.path
              ? "sidebar-button-active"
              : "sidebar-button"
          } text-base  hover:scale-101 transition-all`}
          to={item?.path}
        >
          {item?.icon} {item?.name}
        </NavLink>
      ))}
      {/* logout button */}
      {/* <button
        onClick={() => handleLogOut()}
        className="sidebar-button border-[1px] border-[red] bg-red-500/20 cursor-pointer hover:scale-101 transition-all  w-full"
      >
        <CiLogout /> Logout
      </button> */}
    </div>
  );
};

export default Sidebar;
