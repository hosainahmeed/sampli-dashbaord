import React, { useState } from "react";
import ReviewsAndEarningsSampler from "./ReviewsAndEarningsSampler";
import { Alert, Button, Card, Input, Modal } from "antd";
import { FaExternalLinkAlt } from "react-icons/fa";
import { LuBadgeDollarSign } from "react-icons/lu";
import toast from "react-hot-toast";
import { IoIosAlert } from "react-icons/io";
import { Link } from "react-router-dom";
import paypalImage from "../../../../../assets/paypal.svg";
import stripeImage from "../../../../../assets/stripe.svg";
import gift from "../../../../../assets/gift-02.svg";
import sale from "../../../../../assets/sale-03.svg";
import { useGetReviewerProfileQuery } from "../../../../../Redux/sampler/reviewerProfileApis";
import { usePostPaymentMutation } from "../../../../../Redux/sampler/paymentApis";

const EarningsSampler = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGetPaidModalVisible, setIsGetPaidModalVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { data: getMyProfile } = useGetReviewerProfileQuery();

  const [createPayment, { isLoading: paymentLoading }] =
    usePostPaymentMutation();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModalGetPaid = () => {
    setIsGetPaidModalVisible(true);
  };

  const handleCancelGetPaid = () => {
    setIsGetPaidModalVisible(false);
  };

  const handleWithdraw = () => {
    toast.success(`Withdrawing $${withdrawAmount}`);
    setIsModalVisible(false);
    setIsGetPaidModalVisible(false);
  };

  const setUpOnBoarding = async () => {
    try {
      const res = await createPayment();
      console.log(res);
      window.open(res?.data?.data, "_blank");
      setIsGetPaidModalVisible(false);
    } catch (error) {
      console.log(error);

      //a
    }
  };

  return (
    <div className="responsive-width !h-screen !mb-32 !mt-5">
      <div>
        <div className="text-3xl  font-semibold mb-10">Earnings</div>

        <div className="flex justify-between items-center ">
          <div>
            Total Balance:{" "}
            <span className="text-blue-500 text-xl font-bold">$ 0.00</span>
          </div>

          <div className="flex items-center gap-5">
            <Link to="/sampler/campaign/transaction-history">
              <button className="!text-blue-500 hover:!text-blue-400 cursor-pointer">
                Transaction History
              </button>
            </Link>

            <button
              onClick={showModal}
              className="bg-blue-500 cursor-pointer !text-[14px] !text-white px-4 py-3 rounded-lg hover:bg-blue-600"
            >
              + Get Paid Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div className="flex flex-col  justify-between bg-white border border-gray-100 shadow-md rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={gift} alt="gift" />
              <span className="text-lg font-semibold">Review rewards</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">$0.00</div>
              <div className="text-gray-500 text-sm">Pending: $0.00</div>
            </div>
          </div>

          <div className="flex flex-col  justify-between bg-white border border-gray-100 shadow-md rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={sale} alt="gift" />

              <span className="text-lg font-semibold">Sales Commissions</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">$0.00</div>
              <div className="text-gray-500 text-sm">Pending: $0.00</div>
            </div>
          </div>
        </div>
        <ReviewsAndEarningsSampler />
      </div>

      <Modal
        title="Add withdrawal method"
        visible={isModalVisible}
        onCancel={handleCancel}
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

        {/* <Card>
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
        </Card> */}

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
            {!getMyProfile?.data?.isStripeAccountConnected ? (
              <div>
                <Button
                  type="primary"
                  onClick={setUpOnBoarding}
                  className="!flex !items-center !justify-center gap-2"
                >
                  {paymentLoading ? "Loading..." : "Stripe setup"}
                  <FaExternalLinkAlt />
                </Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button type="link" size="small" danger>
                  Edit
                </Button>
                <Button type="link" size="small" onClick={showModalGetPaid}>
                  Choose
                </Button>
              </div>
            )}
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

export default EarningsSampler;
