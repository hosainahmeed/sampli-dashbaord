import React from 'react'
import {Outlet} from "react-router-dom";

function AuthLayout() {
  return (
    <div className="h-screen overflow-hidden flex bg-[var(--black-100)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex-1 w-full p-4 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
