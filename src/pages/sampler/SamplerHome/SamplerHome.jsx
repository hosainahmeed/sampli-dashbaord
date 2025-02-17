import React from 'react'
import HeaderSampler from './components/HeaderSampler'
import OverviewSampler from './components/OverviewSampler'
import OfferDataSampler from './components/offer/OfferDataSampler'

const SamplerHome = () => {
  return (
    <div className="responsive-width">
      <HeaderSampler />
      <OverviewSampler />
      <OfferDataSampler />
    </div>
  )
}

export default SamplerHome
