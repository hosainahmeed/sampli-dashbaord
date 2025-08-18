import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarShipmentsSampler from './shared/SidebarShipmentsSampler'

const ShipmentAndAlertSampler = () => {
  return (
    <div className="responsive-width">
      <div className="p-4 box-border rounded-md flex justify-between items-start  h-screen">
        <div className="max-w-[280px] max-md:max-w-20  w-full rounded-md ">
          <SidebarShipmentsSampler />
        </div>
        <div className="w-full max-w-[calc(100vw-250px)] max-md:max-w-full scroll-y-auto    ">
          <div className="h-[94vh] ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShipmentAndAlertSampler
