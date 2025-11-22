import React, { useEffect, useState } from 'react';
import { Button, Card, message, Modal } from 'antd';
import TargetAudienceLocation from '../../../components/ui/TargetAudienceLocation';
import { useDispatch, useSelector } from 'react-redux';
import ProductSelection from '../Product/ProductSelection';
import TargetAudienceForm from '../../../components/ui/TargetAudienceForm';
import dayjs from 'dayjs';
import ReviewLaunch from '../../../components/ui/ReviewLaunch';
import { useCreateCampaignMutation } from '../../../Redux/businessApis/campaign/campaignApis';
import toast from 'react-hot-toast';
import { reset } from '../../../Redux/slices/CampaingSlice';

const steps = [
  {
    content: <ProductSelection />,
  },
  {
    content: <TargetAudienceForm />,
  },
  {
    content: <TargetAudienceLocation />,
  },
  {
    content: <ReviewLaunch />,
  },
];
const ExistingProduct = () => {
  const campaignData = useSelector((state) => state.campaign);
  const [current, setCurrent] = useState(0);
  const [createCampaign, { isLoading }] = useCreateCampaignMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const data = Object.values(campaignData);
      if (data.some((value) => value !== null || value !== '' || value !== undefined || value !== 0 || value !== false)) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const next = async () => {
    if (!campaignData?.product && current === 0 || campaignData?.product === null || campaignData?.product === '') {
      message.error('Please select a product before proceeding');
      return;
    }

    if (current === 1 && campaignData?.product) {
      const { minAge, maxAge, startDate, endDate, name, gender } = campaignData;
      if ([minAge, maxAge, startDate, endDate, name, gender].some((value) => value === null || value === '')) {
        message.error('Please fill all the fields before proceeding');
        return;
      }
      if (minAge > maxAge) {
        message.error('Min age should be less than max age');
        return;
      }
      const start = campaignData.startDate ? dayjs(campaignData.startDate) : null;
      const end = campaignData.endDate ? dayjs(campaignData.endDate) : null;

      if (start && end) {
        if (start.isAfter(end)) {
          message.error('Start date should be less than end date');
          return;
        }
        if (end.diff(start, 'days') < 21) {
          message.error('End date should be at least 21 days after start date');
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
      const { country, state, city } = campaignData;
      if ([country, state, city].some((value) => value.length === 0 || value === null || value === '')) {
        message.error('Please select a location before proceeding');
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

  const prev = () => {
    if (current > 0 && current < 3) {
      setCurrent(current - 1);
    }
  };

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

    const missing = requiredKeys.filter((key) => !data[key]);
    const invalid = requiredKeys.filter((key) => data[key] === null || data[key] === '' || data[key] === undefined || data[key] === 0 || data[key] === false);

    if (missing.length) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
    if (invalid.length) {
      throw new Error(`Invalid fields: ${invalid.join(', ')}`);
    }
  };

  const handleSubmit = async () => {
    try {
      validatePayload(campaignData);
      const res = await createCampaign(campaignData).unwrap();
      if (!res?.success) {
        throw new Error(res?.message);
      }
      toast.success(res?.message);
      if (window !== undefined) {
        window.open(res?.data?.url, '_blank');
        dispatch(reset())
        window.location.reload();
      }
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Something went wrong';
      toast.error(msg);
    }
  };

  return (
    <Card>
      <div className='w-xl mx-auto h-[70vh] overflow-y-auto scrollbar'>{steps[current].content}</div>
      <div className='mx-auto w-xl mt-12'>

        {current > 0 && current < 2 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button loading={isLoading} type="primary" onClick={() => {
            handleSubmit();
          }}>
            Confirm & Pay
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ExistingProduct;