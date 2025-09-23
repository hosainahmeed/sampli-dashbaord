import React, { useState } from "react";
import ReviewsAndEarningsSampler from "./ReviewsAndEarningsSampler";
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Tag,
} from "antd";
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
import { useGetEarningsReviewerQuery } from "../../../../../Redux/sampler/overviewApis";
import { useUpdateConnectedAccountMutation } from "../../../../../Redux/businessApis/stripesConnected/stripecreateOnboardingApis";
import { FormInput } from "lucide-react";
import { useWithdrawPostMutation } from "../../../../../Redux/sampler/withDrawApis";

const EarningsSampler = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [choose, setChoose] = useState(false);
  const [isGetPaidModalVisible, setIsGetPaidModalVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { data: getMyProfile } = useGetReviewerProfileQuery();
  const { data: getEarningSampler } = useGetEarningsReviewerQuery();
  const [updateConnectedAccount, { isLoading: updateConnectedAccountLoading }] =
    useUpdateConnectedAccountMutation();

  const [isModalOpenWithdraw, setIsModalOpenWithdraw] = useState(false);
  const showModalWithdraw = () => {
    setIsModalOpenWithdraw(true);
  };

  const handleCancelWithdraw = () => {
    setIsModalOpenWithdraw(false);
  };

  const [postWithdraw, { isLoading: withdrawLoading }] =
    useWithdrawPostMutation();

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
    }
  };

  const handleUpdateConnectedAccount = async () => {
    try {
      await updateConnectedAccount()
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(
              res?.message || "Connected account updated successfully"
            );
            window.open(res?.data?.link, "_blank", "noopener,noreferrer");
          }
        });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong"
      );
    }
  };

  const handleOkWithdraw = async (value) => {
    try {
      const data = { amount: Number(value?.price) };
      await postWithdraw(data)
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res?.success) {
            toast.success(
              res?.data?.message || res?.message || "Withdraw success"
            );
          } else {
            toast.error(res?.data?.Buttonmessage || res?.message || "Something went wrong");
            throw new Error(
              res?.data?.message || res?.message || "Something went wrong"
            );
          }
          setIsModalOpenWithdraw(false);
        });
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Something went wrong"
      );
      console.log(error);
    }
  };

  return (
    <div className="responsive-width !h-screen !mb-32 !mt-5">
      <div>
        <div className="text-3xl  font-semibold mb-10">Earnings</div>

        <div className="flex justify-between items-center ">
          <div>
            Current Balance:{" "}
            <span className="text-blue-500 text-xl font-bold">
              ${getMyProfile?.data?.currentBalance}
            </span>
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
              <div className="text-2xl font-bold">
                ${getEarningSampler?.data?.reviewRewards}
              </div>
            </div>
          </div>

          <div className="flex flex-col  justify-between bg-white border border-gray-100 shadow-md rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={sale} alt="gift" />

              <span className="text-lg font-semibold">Sales Commissions</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                ${getEarningSampler?.data?.salesCommissions}
              </div>
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
              <>
                <div className="flex gap-4">
                  <Button
                    loading={updateConnectedAccountLoading}
                    onClick={() => handleUpdateConnectedAccount()}
                    type="default"
                    size="small"
                  >
                    Edit
                  </Button>
                  {/* <Button type="link" size="small" onClick={showModalGetPaid}>
                  Choose
                </Button> */}
                  <Tag color="green">Connected</Tag>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end ">
            <Button
              type="primary"
              onClick={() => {
                showModalWithdraw();
                handleCancel();
              }}
            >
              Choose
            </Button>
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

      <Modal
        title="Withdraw Amount"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpenWithdraw}
        onOk={handleOkWithdraw}
        onCancel={handleCancelWithdraw}
        footer={null}
        centered
      >
        <Form
          requiredMark={false}
          layout="vertical"
          onFinish={handleOkWithdraw}
        >
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please enter minimum price of $1!",
                min: 1,
                validator: (_, value) =>
                  value >= 1
                    ? Promise.resolve()
                    : Promise.reject("Minimum 1 dollar"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end gap-2 w-full">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={withdrawLoading}
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                onClick={handleCancelWithdraw}
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default EarningsSampler;
