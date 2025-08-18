import React, { useState } from 'react'
import { Modal, Checkbox, Input } from 'antd'
import { Edit2 } from 'lucide-react'
import facebookIcon from '../../../../../assets/socialsLogo/facebook.svg'
import instagramIcon from '../../../../../assets/socialsLogo/instragram.svg'
import tiktokIcon from '../../../../../assets/socialsLogo/tiktok.svg'
import webIcon from '../../../../../assets/socialsLogo/web.svg'
import whatsappIcon from '../../../../../assets/socialsLogo/whatsapp.svg'
import youtubeIcon from '../../../../../assets/socialsLogo/youtube.svg'
const PreferencesSettingsSampler = () => {
  const [openModal, setOpenModal] = useState('')

  const [preferences, setPreferences] = useState({
    products: ['Tech & Electronics', 'Home & Kitchen'],
    priceRanges: ['$25-$50'],
    frequency: 'Monthly',
    socialAccounts: {
      youtube: '',
      instagram: '',
      tiktok: '',
      whatsapp: '',
      web: '',
      facebook: '',
    },
  })

  const [tempPreferences, setTempPreferences] = useState(preferences)

  const productCategories = [
    'Tech & Electronics',
    'Home & Kitchen',
    'Fashion & Accessories',
    'Food & Beverages',
    'Beauty & Cosmetics',
    'Sports & Fitness',
    'Home & Kitchen',
    'Toys & Games',
  ]

  const priceRanges = [
    'Under $25',
    '$25-$50',
    '$50-$100',
    '$100-$250',
    '$250-$500',
    '$500+',
  ]

  const frequencies = ['Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly']

  const socialPlatforms = [
    { key: 'facebook', label: facebookIcon },
    { key: 'instagram', label: instagramIcon },
    { key: 'tiktok', label: tiktokIcon },
    { key: 'web', label: webIcon },
    { key: 'whatsapp', label: whatsappIcon },
    { key: 'youtube', label: youtubeIcon },
  ]

  const handleModalSave = (type) => {
    setPreferences(tempPreferences)
    setOpenModal('')
  }

  const handleModalCancel = () => {
    setTempPreferences(preferences)
    setOpenModal('')
  }

  const PreferenceSection = ({ title, items, type }) => (
    <section className="border border-gray-200 p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">{title}</h3>
        <button
          onClick={() => {
            setTempPreferences(preferences)
            setOpenModal(type)
          }}
          className="!text-blue-500 hover:!text-blue-800 flex items-center gap-2 cursor-pointer "
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  )

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">Preferences</h2>

      <PreferenceSection
        title="What products interest you?"
        items={preferences.products}
        type="products"
      />

      <PreferenceSection
        title="Preferred price ranges to review"
        items={preferences.priceRanges}
        type="prices"
      />

      <section className="border border-gray-200 p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">
            How often would you like to receive products?
          </h3>
          <button
            onClick={() => setOpenModal('frequency')}
            className="!text-blue-500 hover:!text-blue-600 flex items-center gap-2 cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            {preferences.frequency}
          </span>
        </div>
      </section>

      {/* Social Accounts Section */}
      <section className="border border-gray-200 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">Linked Social accounts</h3>
          <button
            onClick={() => setOpenModal('social')}
            className="!text-blue-500 hover:!text-blue-600 flex items-center gap-2 cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
        {/* <div className="space-y-2">
          {Object.entries(preferences.socialAccounts).map(
            ([platform, username]) =>
              username && (
                <div key={platform} className="flex items-center gap-2">
                  <span className="capitalize">{platform} :</span>
                  <span className="text-gray-600">{username}</span>
                </div>
              )
          )}
        </div> */}
        <div className="space-y-2 flex gap-3 ">
          {Object.entries(preferences.socialAccounts).map(
            ([platform, username]) => {
              const platformData = socialPlatforms.find(
                (p) => p.key === platform
              )
              return (
                username && (
                  <div
                    key={platform}
                    className=" flex bg-gray-100 h-[30px] text-gray-800 px-3 py-1 rounded-full text-sm items-center gap-2"
                  >
                    <img
                      src={platformData?.label}
                      alt={platform}
                      className="w-6 h-6"
                    />
                    <span>:</span>
                    <span className="text-gray-600">{username}</span>
                  </div>
                )
              )
            }
          )}
        </div>
      </section>

      {/* Product Interests Modal */}
      <Modal
        title="Edit Preferences"
        open={openModal === 'products'}
        onOk={() => handleModalSave('products')}
        onCancel={handleModalCancel}
        okText="Save"
        centered
      >
        <h4 className="text-center font-medium text-lg mb-4">
          What products interest you?
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {productCategories.map((category) => (
            <div
              key={category}
              className="border border-gray-200 p-3 rounded-lg"
            >
              <Checkbox
                checked={tempPreferences.products.includes(category)}
                onChange={(e) => {
                  const newProducts = e.target.checked
                    ? [...tempPreferences.products, category]
                    : tempPreferences.products.filter((p) => p !== category)
                  setTempPreferences({
                    ...tempPreferences,
                    products: newProducts,
                  })
                }}
              >
                {category}
              </Checkbox>
            </div>
          ))}
        </div>
      </Modal>

      {/* Price Ranges Modal */}
      <Modal
        title="Edit Price Ranges"
        open={openModal === 'prices'}
        onOk={() => handleModalSave('prices')}
        onCancel={handleModalCancel}
        okText="Save"
        centered
      >
        <h4 className="text-center font-medium text-lg mb-4">
          Preferred price ranges to review
        </h4>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <div key={range} className="border border-gray-200 p-3 rounded-lg">
              <Checkbox
                checked={tempPreferences.priceRanges.includes(range)}
                onChange={(e) => {
                  const newRanges = e.target.checked
                    ? [...tempPreferences.priceRanges, range]
                    : tempPreferences.priceRanges.filter((p) => p !== range)
                  setTempPreferences({
                    ...tempPreferences,
                    priceRanges: newRanges,
                  })
                }}
              >
                {range}
              </Checkbox>
            </div>
          ))}
        </div>
      </Modal>

      {/* Frequency Modal */}
      <Modal
        title="Edit Frequency"
        open={openModal === 'frequency'}
        onOk={() => handleModalSave('frequency')}
        onCancel={handleModalCancel}
        okText="Save"
        centered
      >
        <h4 className="text-center font-medium text-lg mb-4">
          How often would you like to receive products?
        </h4>
        <div className="space-y-3">
          {frequencies.map((freq) => (
            <div key={freq} className="border border-gray-200 p-3 rounded-lg">
              <Checkbox
                checked={tempPreferences.frequency === freq}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTempPreferences({ ...tempPreferences, frequency: freq })
                  }
                }}
              >
                {freq}
              </Checkbox>
            </div>
          ))}
        </div>
      </Modal>

      {/* Social Accounts Modal */}
      <Modal
        title="Edit Linked Socials"
        open={openModal === 'social'}
        onOk={() => handleModalSave('social')}
        onCancel={handleModalCancel}
        okText="Save"
        centered
      >
        <div className="space-y-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.key} className="space-y-1">
              <div className="flex gap-2 items-center justify-center">
                <div>
                  <img src={platform.label} alt={platform.name} />
                </div>
                <Input
                  value={tempPreferences.socialAccounts[platform.key]}
                  className="h-[40px]"
                  onChange={(e) => {
                    setTempPreferences({
                      ...tempPreferences,
                      socialAccounts: {
                        ...tempPreferences.socialAccounts,
                        [platform.key]: e.target.value,
                      },
                    })
                  }}
                  placeholder={`Enter your ${platform.key} username`}
                />
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default PreferencesSettingsSampler
