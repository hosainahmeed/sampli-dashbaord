import React, { useState } from 'react'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { SiFuturelearn } from 'react-icons/si'
import { VscPreview } from 'react-icons/vsc'
import { Dropdown, Menu } from 'antd'
import { DownOutlined, FilterOutlined } from '@ant-design/icons'

const data = [
  {
    id: 1,
    icon: <SiFuturelearn className="text-blue-500 text-xl" />,
    name: 'Total Earnings',
    earn: 2398.0,
    currency: '$',
    percentage: '40%',
    type: 'Vs last month',
    percentageType: 'decrease',
  },
  {
    id: 2,
    icon: <VscPreview className="text-blue-500 text-xl" />,
    name: 'Total Reviews',
    earn: 2398,
    percentage: '40%',
    type: 'Vs last month',
    percentageType: 'increase',
  },
  {
    id: 3,
    icon: <LiaShippingFastSolid className="text-blue-500 text-xl" />,
    name: 'Items in shipment',
    earn: 34,
    percentage: '40%',
    type: 'Vs last month',
    percentageType: 'increase',
  },
]

const OverviewSampler = () => {
  const [selectedFilter, setSelectedFilter] = useState('This month')

  const menu = (
    <Menu
      onClick={(e) => setSelectedFilter(e.key)}
      items={[
        { key: 'Today', label: 'Today' },
        { key: 'This week', label: 'This week' },
        { key: 'Last week', label: 'Last week' },
        { key: 'This month', label: 'This month' },
      ]}
    />
  )

  return (
    <div className="bg-white  rounded-xl ">
      {/* Header Section */}
      <div className="flex justify-between items-center mt-14">
        <h2 className="text-xl !font-semibold !mb-5">Overview</h2>
        <Dropdown
          className="border border-gray-300 !px-3 !py-2 !text-sm !text-gray-700  !cursor-pointer !rounded-md hover:bg-gray-100"
          overlay={menu}
          trigger={['click']}
        >
          <button className="border px-3 py-1 rounded-lg flex items-center gap-2 text-gray-600 hover:bg-gray-100">
            <FilterOutlined />
            {selectedFilter} <DownOutlined />
          </button>
        </Dropdown>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm  ">
            <div className="flex items-center gap-2">
              <div>
                <div className="flex  gap-2 ">
                  <div>{item.icon}</div>
                  <p className="text-gray-500 ">{item.name}</p>
                </div>
              </div>
            </div>
            <div className="flex  items-center  gap-3">
              <p className="text-xl font-semibold">
                {item.currency ? item.currency : ''}
                {item.earn.toLocaleString()}
              </p>
              <p
                className={`text-sm ${
                  item.percentageType === 'increase'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {item.percentageType === 'increase' ? '▲' : '▼'}{' '}
                {item.percentage}
              </p>
              <p className="text-gray-600 text-sm">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverviewSampler
