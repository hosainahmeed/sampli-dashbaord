import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Shared/Sidebar.jsx";
import Header from "../components/Shared/Header.jsx";

const MainLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-[calc(100%-64px)] overflow-hidden flex bg-[var(--black-100)]">
        {/* Sidebar */}
        <div className="sidebar scrollbar sm:w-[200px] xl:w-[300px] h-full p-4 overflow-y-scroll bg-[#f8f8fa]">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 w-full p-8 overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
