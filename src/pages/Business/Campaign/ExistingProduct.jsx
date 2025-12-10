import React, { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'antd';
import TargetAudienceLocation from '../../../components/ui/TargetAudienceLocation';
import { useDispatch, useSelector } from 'react-redux';
import ProductSelection from '../Product/ProductSelection';
import TargetAudienceForm from '../../../components/ui/TargetAudienceForm';
import dayjs from 'dayjs';
import ReviewLaunch from '../../../components/ui/ReviewLaunch';
import { useCreateCampaignMutation } from '../../../Redux/businessApis/campaign/campaignApis';
import toast from 'react-hot-toast';
import { reset } from '../../../Redux/slices/CampaingSlice';
import { FaInfoCircle } from 'react-icons/fa';

const steps = [
  { content: <ProductSelection /> },
  { content: <TargetAudienceForm /> },
  { content: <TargetAudienceLocation /> },
  { content: <ReviewLaunch /> },
];

const ExistingProduct = () => {
  const campaignData = useSelector((state) => state.campaign);
  const [current, setCurrent] = useState(0);

  const [createCampaign, { isLoading }] = useCreateCampaignMutation();
  const dispatch = useDispatch();

  // ======================================================
  //  REAL RELOAD / TAB CLOSE PROTECTION (iOS Compatible)
  // ======================================================

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (current === 3) return;

      const data = Object.values(campaignData);
      const hasUnsavedChanges = data.some(
        value => value !== null &&
          value !== "" &&
          value !== undefined &&
          value !== 0
      );

      if (hasUnsavedChanges) {
        e.preventDefault();
        // Modern browsers require both of these
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [campaignData, current]); 


  // ======================================================
  // NEXT STEP LOGIC 
  // ======================================================

  const next = async () => {
    if (!campaignData?.product && current === 0 || campaignData?.product === null || campaignData?.product === '') {
      toast.error('Please select a product before proceeding');
      return;
    }

    if (current === 1 && campaignData?.product) {
      const { minAge, maxAge, startDate, endDate, name, gender, isShowEverywhere, reviewType, numberOfReviewers } = campaignData;

      const fields = {
        minAge,
        maxAge,
        startDate,
        endDate,
        name,
        gender,
        reviewType,
        numberOfReviewers
      };

      for (const [key, value] of Object.entries(fields)) {
        if (value === null || value === "") {
          toast.dismiss()
          toast.error(`Please fill the "${key}" field before proceeding`);
          return;
        }
      }

      if (minAge > maxAge) {
        toast.error('Min age should be less than max age');
        return;
      }
      const start = campaignData.startDate ? dayjs(campaignData.startDate) : null;
      const end = campaignData.endDate ? dayjs(campaignData.endDate) : null;

      if (start && end) {
        if (start.isAfter(end)) {
          toast.error('Start date should be less than end date');
          return;
        }
        if (end.diff(start, 'days') < 21) {
          toast.error('End date should be at least 21 days after start date');
          return;
        }
      }

      return new Promise((resolve) => {
        Modal.confirm({
          title: 'Important: Data Submission Confirmation',
          content: (
            <div>
              <p>You are about to submit your campaign details. Please confirm that:</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>All information is accurate and complete</li>
                <li>You understand that you won't be able to go back to edit after submission</li>
                <li className={`${isShowEverywhere ? 'text-green-500' : 'text-red-500'}`}>Are you sure you want to proceed with {isShowEverywhere ? 'showing' : 'not showing'} campaign to all?</li>
                {!isShowEverywhere && (
                  <>
                    <span className='text-sm mt-2 flex items-center gap-2'><FaInfoCircle /> if you are Show Campaign to all, then you will get:</span>
                    <ul className='list-disc pl-5'>
                      <li className='text-sm'>Wider reach</li>
                      <li className='text-sm'>More referrals</li>
                      <li className='text-sm'>More impressions</li>
                      {/* <li className='text-sm'>To avoid limiting their campaign too much</li> */}
                    </ul>
                  </>
                )}
              </ul>
              <p>Would you like to proceed to the next step?</p>
            </div>
          ),
          okText: 'Yes, Proceed',
          cancelText: 'No, Let me check again',
          onOk: () => {
            setCurrent(current + 1);
            resolve(true);
          },
          onCancel: () => {
            resolve(false);
          },
          width: 600
        });
      });
    }

    if (current === 2 && campaignData?.product) {
      const { country, state } = campaignData;
      if ([country, state].some((value) => value.length === 0 || value === null || value === '')) {
        toast.error('Please select a location before proceeding');
        return;
      }
      return new Promise((resolve) => {
        Modal.confirm({
          title: 'Important: Data Submission Confirmation',
          content: (
            <div>
              <p>Are you sure you want to proceed to the next step?</p>
              <ul style={{ paddingLeft: 20 }}>
                <li>You have selected the correct state and city</li>
              </ul>
            </div>
          ),
          okText: 'Yes, Proceed',
          cancelText: 'No, Let me check again',
          onOk: () => {
            setCurrent(current + 1);
            resolve(true);
            localStorage.setItem("page_reload", false)
          },
          onCancel: () => {
            resolve(false);
          },
          width: 600
        });
      });
    }
    setCurrent(current + 1);
  };
  // ======================================================
  // PREV STEP LOGIC 
  // ======================================================

  const prev = () => {
    if (current > 0 && current < 3) {
      setCurrent(current - 1);
    }
  };


  // ======================================================
  // SUBMIT LOGIC UNCHANGED
  // ======================================================
  const validatePayload = (data) => {
    const requiredKeys = [
      'product',
      'name',
      'reviewType',
      'numberOfReviewers',
      'minAge',
      'maxAge',
      'startDate',
      'endDate',
      'gender',
      'paymentMethod',
    ];

    const invalid = requiredKeys.filter((key) => !data[key]);

    if (invalid.length) {
      throw new Error(`Missing or invalid fields: ${invalid.join(', ')}`);
    }
  };

  const handleSubmit = async () => {
    try {
      validatePayload(campaignData);
      const res = await createCampaign(campaignData).unwrap();

      if (!res?.success) throw new Error(res?.message);

      toast.success(res?.message);
      window.location.href = res?.data?.url
      dispatch(reset());
    } catch (err) {
      toast.error(err?.message || 'Something went wrong');
    }
  };

  return (
    <Card>
      <div className="w-xl mx-auto h-[70vh] overflow-y-auto scrollbar">
        {steps[current].content}
      </div>

      <div className="mx-auto w-xl mt-12">
        {current > 0 && current < 2 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}

        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button loading={isLoading} type="primary" onClick={handleSubmit}>
            Confirm & Pay
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ExistingProduct;
