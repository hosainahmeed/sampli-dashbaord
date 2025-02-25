import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarSettings from './shared/SidebarSettings'

const SettingsSampler = () => {
  return (
    <div className="responsive-width ">
      <div className="p-4 box-border rounded-md flex justify-between items-start   ">
        <div className="max-w-[250px] w-full rounded-md ">
          <SidebarSettings />
        </div>
        <div className="w-full max-w-[calc(100vw-250px)] scroll-y-auto    ">
          <div className="h-[94vh] ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsSampler
