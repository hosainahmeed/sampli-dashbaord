import React, { useState } from "react";
import { Table, Select, Button, DatePicker, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import bank from "../../../assets/bank.svg";
import { BsExclamationOctagon } from "react-icons/bs";
const { Option } = Select;

const TransectionOfBusiness = () => {
  const [filters, setFilters] = useState({
    dateRange: "",
    category: "",
    status: "",
  });
  const balance = 200;
  const pending = 0;
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const navigate = useNavigate();
  const handleDateChange = (dates, dateStrings) => {
    setSelectedDateRange(dateStrings);
  };

  const handleApply = () => {
    console.log("Selected Date Range: ", selectedDateRange);
  };

  const transactionData = [
    {
      key: "1",
      date: "23 Mar, 2024",
      item: "Mini Portable Refillable Sprayer Atomizer",
      amount: 5,
      status: "Successful",
      refId: "709692663",
    },
    {
      key: "2",
      date: "23 Mar, 2024",
      item: "Mini Portable Refillable Sprayer Atomizer",
      amount: 5,
      status: "Successful",
      refId: "709692663",
    },
    {
      key: "3",
      date: "23 Mar, 2024",
      item: "Mini Portable Refillable Sprayer Atomizer",
      amount: 5,
      status: "Processing",
      refId: "709692663",
    },
    {
      key: "4",
      date: "23 Mar, 2024",
      item: "Mini Portable Refillable Sprayer Atomizer",
      amount: 5,
      status: "Successful",
      refId: "709692663",
    },
    {
      key: "5",
      date: "23 Mar, 2024",
      item: "Mini Portable Refillable Sprayer Atomizer",
      amount: 5,
      status: "Cancelled",
      refId: "709692663",
    },
    {
      key: "6",
      date: "23 Mar, 2024",
      item: "Mini Portable Refillable Sprayer Atomizer",
      amount: 5,
      status: "Cancelled",
      refId: "709692663",
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => <span className="text-[#999Eab]">{date}</span>,
      key: "date",
      render: (_, text) => (
        <p className="text-gray-500 text-center">{text.date}</p>
      ),
    },
    {
      title: "Item",
      dataIndex: "item",
      render: (item) => <span className="text-[#111] underline">{item}</span>,
      key: "item",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <p className="text-[#6D7486]">{` - $${amount}`}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`${
            status === "Successful"
              ? "bg-gray-100 text-green-500"
              : status === "Processing"
              ? "bg-gray-100 text-purple-700"
              : "bg-gray-100 text-red-500"
          } p-1 rounded-md text-sm`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Ref ID",
      dataIndex: "refId",
      key: "refId",
    },
  ];

  return (
    <div className="">
      <div
        className="flex items-center gap-2 text-[#999Eab] cursor-pointer hover:text-[#111] transition-all"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <h1 className="!mt-2">Back</h1>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <img src={bank} alt="balance logo" className="w-4" />
              <h1 className="text-[14px] !mt-3">Available balance</h1>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-[32px] font-black">${balance.toFixed(2)}</h2>
              <h4 className="text-sm">${pending.toFixed(2)} pending</h4>
              <BsExclamationOctagon size={10} />
            </div>
          </div>
          <div>
            <Button
              onClick={() => showPaymentModal(!paymentModal)}
              className="flex items-center justify-center"
              type="primary"
            >
              Get paid now
            </Button>
          </div>
        </div>
      </Card>
      <div className="p-4 bg-[#4176FC0D] text-[#2863FA] mt-4 rounded-xl flex gap-2 justify-start items-start">
        <BsExclamationOctagon className="leading-none m-0 p-0" size={20} />
        <h1 className="flex gap-2">
          Pending balances become available for you after they've successfully
          passed through the 7 days security period.
        </h1>
      </div>
      <div className="text-2xl font-semibold !my-6">Transaction History</div>
      <div className="mt-7">
        <div className="flex justify-between gap-6">
          <div className="flex gap-6 mb-6">
            <div>
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

              {filters.dateRange === "customDateRange" && (
                <div className="mt-5 ">
                  <div className="flex gap-6">
                    <div className="w-40">
                      <p className="!mb-1 !text-sm text-gray-600">From</p>
                      <DatePicker
                        format="MMM D, YYYY"
                        style={{ width: "100%" }}
                        onChange={handleDateChange}
                      />
                    </div>
                    <div className="w-40">
                      <p className="!mb-1 !text-sm text-gray-600">To</p>
                      <DatePicker
                        format="MMM D, YYYY"
                        style={{ width: "100%" }}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>

                  <Button
                    type="primary"
                    onClick={handleApply}
                    className="w-full mt-6"
                    style={{
                      fontSize: "16px",
                      marginTop: "10px",
                      fontWeight: "500",
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
            className="ml-auto !bg-transparent border !border-blue-500 !hover:bg-blue-600 !text-blue-500"
          >
            Download CSV
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={transactionData}
          rowKey="key"
          pagination={false}
          scroll={{ x: 1200 }}
        />
      </div>

      <Modal
        title="Add withdrawal method"
        visible={paymentModal}
        onCancel={() => showPaymentModal(!paymentModal)}
        footer={null}
        width={500}
        centered
      >
        <Alert
          message={
            <div className="flex items-start justify-start ">
              <div>
                <IoIosAlert className="text-xl text-orange-500 " />
              </div>
              <span className="ml-3">
                The name on your withdrawal method and the name on your Sampli
                account need to match exactly to avoid payment failures or
                delays.
              </span>
            </div>
          }
          type="warning"
          style={{ marginBottom: "16px" }}
        />

        <Card>
          <div className="flex justify-between items-center  ">
            <section>
              <div className="flex items-center">
                <img src={paypalImage} alt="paypal" className="w-6" />
                <span className="ml-3">Paypal account</span>
              </div>
              <div>
                <ul className="list-disc ml-13 text-gray-500">
                  <li>Up to 1 business day</li>
                  <li>Fees may apply</li>
                </ul>
              </div>
            </section>
            <div className="flex gap-4">
              <Button type="link" size="small">
                Edit
              </Button>
              <Button type="link" size="small" danger>
                Remove
              </Button>
            </div>
          </div>
        </Card>

        <Card className="!mt-5">
          <div className="flex justify-between items-center ">
            <section>
              <div className="flex items-center">
                <img src={stripeImage} alt="stripe" className="w-6" />

                <span className="ml-3">Stripe account</span>
              </div>
              <div>
                <ul className="list-disc ml-13 text-gray-500">
                  <li>Up to 1 business day</li>
                  <li>Fees may apply</li>
                </ul>
              </div>
            </section>
            <div>
              <Button
                type="primary"
                // onClick={showModalGetPaid}
                className="!flex !items-center !justify-center gap-2"
              >
                Setup
                <FaExternalLinkAlt />
              </Button>
            </div>
          </div>
        </Card>
      </Modal>

      <Modal
        title="Get paid"
        visible={isGetPaidModalVisible}
        onCancel={handleCancelGetPaid}
        footer={null}
        width={500}
        centered
      >
        <div className="flex flex-col items-center mb-4">
          <LuBadgeDollarSign style={{ fontSize: 32, color: "#FF7A00" }} />
          <div className="ml-3 mt-2 max-w-[300px] w-full">
            <h3 className="text-gray-500 text-center">
              Enter the amount you wish to withdraw from your total balance.
            </h3>
            <p className="text-center">
              Available Balance:{" "}
              <span className="font-bold text-x text-blue-500">$426.25</span>
            </p>
          </div>
        </div>

        {/* Withdrawal Amount Input */}
        <div className="mb-4">
          <label htmlFor="withdrawAmount">Withdrawal Amount</label>
          <Input
            id="withdrawAmount"
            prefix="$"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        {/* Withdraw Button */}
        <div className="flex justify-center">
          <Button
            type="primary"
            onClick={handleWithdraw}
            style={{ width: "100%", fontSize: "16px", fontWeight: "500" }}
          >
            Withdraw
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TransectionOfBusiness;
