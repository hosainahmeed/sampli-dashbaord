import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../../components/Shared/Header'
import StoreFooter from '../../../components/Shared/StoreFooter'

const SamplerLayout = () => {
  return (
    <div>
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <StoreFooter />
    </div>
  )
}

export default SamplerLayout
