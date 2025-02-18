import React from 'react'
import HeaderSampler from './components/HeaderSampler'
import OverviewSampler from './components/OverviewSampler'
import OfferDataSampler from './components/offer/OfferDataSampler'
import ShipmentsSampler from './components/shipments/ShipmentsSampler'
import ReviewsAndEarningsSampler from './components/reviewsAndEarnings/ReviewsAndEarningsSampler'

const SamplerHome = () => {
  return (
    <div className="responsive-width">
      <HeaderSampler />
      <OverviewSampler />
      <OfferDataSampler />
      <ShipmentsSampler />
      <ReviewsAndEarningsSampler />
    </div>
  )
}

export default SamplerHome
