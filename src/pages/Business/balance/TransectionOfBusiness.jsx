import React, { useState } from "react";
import {
  Table,
  Select,
  Button,
  DatePicker,
  Card,
  Modal,
  Input,
  Alert,
  Skeleton
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaExternalLinkAlt } from "react-icons/fa";
import bank from "../../../assets/bank.svg";
import { BsExclamationOctagon } from "react-icons/bs";
// import paypalImage from "../../../assets/paypal.svg";
import stripeImage from "../../../assets/stripe.svg";
import { IoIosAlert } from "react-icons/io";
import { LuBadgeDollarSign } from "react-icons/lu";
import toast from "react-hot-toast";
import { usePostPaymentMutation } from "../../../Redux/sampler/paymentApis";
import TransectionTableOfBusiness from "./TransectionTableOfBusiness";
import { useGetBusinessMetaQuery } from "../../../Redux/businessApis/meta/bussinessMetaApis";
import { useGetProfileQuery } from "../../../Redux/businessApis/business _profile/getprofileApi";
const TransectionOfBusiness = () => {
  const { data: businessMeta, isLoading: businessMetaLoading } = useGetBusinessMetaQuery();
  const [isGetPaidModalVisible, setIsGetPaidModalVisible] = useState(false);
  const [paymentModal, showPaymentModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
  // const [isModalVisible, setIsModalVisible] = useState(false)
  const [createPayment] =
    usePostPaymentMutation();
  const navigate = useNavigate();

  const handleCancelGetPaid = () => {
    setIsGetPaidModalVisible(false);
  };

  const handleWithdraw = () => {
    toast.success(`Withdrawing $${withdrawAmount}`);
    showPaymentModal(false);
    setIsGetPaidModalVisible(false);
  };

  const setUpOnBoarding = async () => {
    try {
      await createPayment().unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message || "Link created successfully")
          window.open(res?.data, "_self");
          setIsGetPaidModalVisible(false);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message || "Something went wrong");
    }
  };
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
              {businessMetaLoading ?
                <Skeleton.Input size="default" />
                :
                <h2 className="text-[32px] font-black">${businessMeta?.data?.currentBalance.toFixed(2)}</h2>
              }
              {/* <h4 className="text-sm">${businessMeta?.data?.pendingBalance.toFixed(2)} pending</h4> */}
              <BsExclamationOctagon size={10} />
            </div>
          </div>
          <div>
            <Button
              loading={businessMetaLoading}
              disabled={businessMetaLoading}
              onClick={() => showPaymentModal(!paymentModal)}
              className="flex items-center justify-center"
              type="primary"
            >
              Withdraw
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
        <TransectionTableOfBusiness />
      </div>

      <Modal
        title="Add withdrawal method"
        loading={profileLoading}
        open={paymentModal}
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
            <div>
              {!profileData?.data?.isStripeAccountConnected ?
                <div className="flex gap-4">
                  <Button type="link" size="small">
                    Edit
                  </Button>
                  <Button type="link" size="small" danger>
                    Remove
                  </Button>
                </div>
                :
                <Button
                  type="primary"
                  loading={createOnboardingLoading}
                  onClick={handleCreateOnboarding}
                  className="!flex !items-center !justify-center gap-2"
                >
                  Setup
                  <FaExternalLinkAlt />
                </Button>
              }
            </div>
          </div>
        </Card>
      </Modal>

      <Modal
        title="Get paid"
        open={isGetPaidModalVisible}
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
