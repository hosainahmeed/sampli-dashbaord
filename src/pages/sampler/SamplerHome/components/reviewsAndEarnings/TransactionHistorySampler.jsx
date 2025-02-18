import React, { useState } from 'react'
import { Table, Select, Button, DatePicker } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

const { Option } = Select

const TransactionHistorySampler = () => {
  const [filters, setFilters] = useState({
    dateRange: '',
    category: '',
    status: '',
  })

  const [selectedDateRange, setSelectedDateRange] = useState([])

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDateRange(dateStrings)
  }

  const handleApply = () => {
    console.log('Selected Date Range: ', selectedDateRange)
  }

  const transactionData = [
    {
      key: '1',
      date: '23 Mar, 2024',
      item: 'Mini Portable Refillable Sprayer Atomizer',
      amount: -5,
      status: 'Successful',
      refId: '709692663',
    },
    {
      key: '2',
      date: '23 Mar, 2024',
      item: 'Mini Portable Refillable Sprayer Atomizer',
      amount: -5,
      status: 'Successful',
      refId: '709692663',
    },
    {
      key: '3',
      date: '23 Mar, 2024',
      item: 'Mini Portable Refillable Sprayer Atomizer',
      amount: -5,
      status: 'Processing',
      refId: '709692663',
    },
    {
      key: '4',
      date: '23 Mar, 2024',
      item: 'Mini Portable Refillable Sprayer Atomizer',
      amount: -5,
      status: 'Successful',
      refId: '709692663',
    },
    {
      key: '5',
      date: '23 Mar, 2024',
      item: 'Mini Portable Refillable Sprayer Atomizer',
      amount: -5,
      status: 'Cancelled',
      refId: '709692663',
    },
    {
      key: '6',
      date: '23 Mar, 2024',
      item: 'Mini Portable Refillable Sprayer Atomizer',
      amount: -5,
      status: 'Cancelled',
      refId: '709692663',
    },
  ]

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          className={`${
            status === 'Successful'
              ? 'bg-gray-100 text-green-700'
              : status === 'Processing'
              ? 'bg-gray-100 text-purple-700'
              : 'bg-gray-100 text-red-700'
          } p-1 rounded-md text-sm`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'Ref ID',
      dataIndex: 'refId',
      key: 'refId',
    },
  ]

  return (
    <div className="responsive-width">
      <div className="text-2xl font-semibold">Transaction History</div>

      <div className="mt-7">
        <div className="flex justify-between gap-6">
          <div className="flex gap-6 mb-6">
            <div >
              <Select
                className="w-40"
                placeholder="Date range"
                onChange={(value) =>
                  setFilters({ ...filters, dateRange: value })
                }
              >
                <Option value="lastWeek">Last Week</Option>
                <Option value="lastMonth">Last Month</Option>
                <Option value="thisMonth">This Month</Option>
                <Option value="allTimeDate">All Time</Option>
                <Option value="customDateRange">Custom date range</Option>
              </Select>

              {filters.dateRange === 'customDateRange' && (
                <div className='mt-5 '>
                  <div className="flex gap-6">
                    <div className="w-40">
                      <p className="!mb-1 !text-sm text-gray-600">From</p>
                      <DatePicker
                        format="MMM D, YYYY"
                        style={{ width: '100%' }}
                        onChange={handleDateChange}
                      />
                    </div>
                    <div className="w-40">
                      <p className="!mb-1 !text-sm text-gray-600">To</p>
                      <DatePicker
                        format="MMM D, YYYY"
                        style={{ width: '100%' }}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>

                  <Button
                    type="primary"
                    onClick={handleApply}
                    className="w-full mt-6"
                    style={{
                      fontSize: '16px',
                      marginTop: '10px',
                      fontWeight: '500',
                    }}
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>

            <Select
              className="w-40"
              placeholder="All category"
              onChange={(value) => setFilters({ ...filters, category: value })}
            >
              <Option value="allCategory">All</Option>
              <Option value="reviewRewards">Review rewards</Option>
              <Option value="salesCommission">Sales commission</Option>
            </Select>

            <Select
              className="w-40"
              placeholder="All status"
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="successful">Successful</Option>
              <Option value="processing">Processing</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </div>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white"
          >
            Download CSV
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={transactionData}
          rowKey="key"
          pagination={false}
        />
      </div>
    </div>
  )
}

export default TransactionHistorySampler
