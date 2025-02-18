import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarShipmentsSampler from './shared/SidebarShipmentsSampler'

const ShipmentAndAlertSampler = () => {
  return (
    <div className='responsive-width'>
      <div className="p-4 box-border rounded-md flex justify-between items-start overflow-hidden h-screen">
        <div className="w-[550px] rounded-md overflow-hidden">
          <SidebarShipmentsSampler />
        </div>
        <div className="w-[calc(100vw-288px)] px-3">
          <div className="h-[94vh] ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShipmentAndAlertSampler
