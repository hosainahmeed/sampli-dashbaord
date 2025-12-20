import React, { useState } from "react";
import { Table, Select, Button, DatePicker } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useGetMyTransactionQuery } from "../../../../../Redux/sampler/transactionApis";
import Papa from "papaparse";

const { Option } = Select;

const TransactionHistorySampler = () => {
  const [filters, setFilters] = useState({
    dateRange: "",
    category: "",
    status: "",
  });

  const [category, setCategory] = useState("");
  const { data: getAllMyTransaction, isLoading } = useGetMyTransactionQuery({
    ...(category !== "" && { transactionReason: category }),
  });
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDateRange(dateStrings);
  };

  const handleApply = () => {
    console.log("Selected Date Range: ", selectedDateRange);
  };

  // const transactionData = [
  //   {
  //     key: '1',
  //     date: '23 Mar, 2024',
  //     item: 'Mini Portable Refillable Sprayer Atomizer',
  //     amount: -5,
  //     status: 'Successful',
  //     refId: '709692663',
  //   },
  //   {
  //     key: '2',
  //     date: '23 Mar, 2024',
  //     item: 'Mini Portable Refillable Sprayer Atomizer',
  //     amount: -5,
  //     status: 'Successful',
  //     refId: '709692663',
  //   },
  //   {
  //     key: '3',
  //     date: '23 Mar, 2024',
  //     item: 'Mini Portable Refillable Sprayer Atomizer',
  //     amount: -5,
  //     status: 'Processing',
  //     refId: '709692663',
  //   },
  //   {
  //     key: '4',
  //     date: '23 Mar, 2024',
  //     item: 'Mini Portable Refillable Sprayer Atomizer',
  //     amount: -5,
  //     status: 'Successful',
  //     refId: '709692663',
  //   },
  //   {
  //     key: '5',
  //     date: '23 Mar, 2024',
  //     item: 'Mini Portable Refillable Sprayer Atomizer',
  //     amount: -5,
  //     status: 'Cancelled',
  //     refId: '709692663',
  //   },
  //   {
  //     key: '6',
  //     date: '23 Mar, 2024',
  //     item: 'Mini Portable Refillable Sprayer Atomizer',
  //     amount: -5,
  //     status: 'Cancelled',
  //     refId: '709692663',
  //   },
  // ]
  
  const transactionData = getAllMyTransaction?.data?.result;
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (_, record) => (
        <span className="text-[#999Eab]">
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(new Date("2025-03-10T00:00:00.000Z"))}
        </span>
      ),
      key: "date",
    },

    {
      title: "Item",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <p className="text-[#6D7486]">{` $${record?.description}`}</p>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <p className="text-[#6D7486]">{` $${record?.amount}`}</p>
      ),
    },

    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => (
    //     <span
    //       className={`${
    //         status === "Successful"
    //           ? "bg-gray-100 text-green-500"
    //           : status === "Processing"
    //           ? "bg-gray-100 text-purple-700"
    //           : "bg-gray-100 text-red-500"
    //       } p-1 rounded-md text-sm`}
    //     >
    //       {status}
    //     </span>
    //   ),
    // },
    {
      title: "TransactionId ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (_, record) => (
        <p className="text-[#6D7486]">{`${record?.transactionId}`}</p>
      ),
    },
  ];

  const handleDownloadCSV = () => {
    if (!transactionData || transactionData.length === 0) return;

    setLoading(true);

    setTimeout(() => {
      const csvData = transactionData.map((item) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(new Date("2025-03-10T00:00:00.000Z")),
        item: item.description,
        amount: item.amount,
        transactionId: item.transactionId,
      }));

      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transaction_history.csv");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      setLoading(false); // stop loading
    }, 500); // optional delay for UX
  };

  return (
    <div className="responsive-width h-screen !mt-5">
      <div className="text-2xl font-semibold">Transaction History</div>

      <div className="mt-7">
        <div className="flex justify-between gap-6">
          <div className="flex gap-6 mb-6">
            {/* <div>
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
                <div className="mt-5 ">
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
            </div> */}

            <Select
              className="w-40"
              placeholder="Category"
              onChange={(value) => setCategory(value)}
            >
              <Option value="Order_Payment">Order Payment</Option>
              <Option value="Withdrawal">Withdrawal</Option>
              <Option value="Referral_Bonus">Referral Bonus</Option>
              <Option value="Campaign_Payment">Campaign Payment</Option>
            </Select>

            {/* <Select
              className="w-40"
              placeholder="All status"
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="successful">Successful</Option>
              <Option value="processing">Processing</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select> */}
          </div>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleDownloadCSV}
            loading={loading}
          >
            Download CSV
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={transactionData}
          rowKey="key"
          loading={isLoading}
          pagination={false}
          scroll={{ x: 1200 }}
        />
      </div>
    </div>
  );
};

export default TransactionHistorySampler;
