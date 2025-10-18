import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import toast from 'react-hot-toast';
import planet1 from '../../../assets/Planet (1).png';
import ProductSelection from '../Product/ProductSelection';
import TargetAudienceForm from '../../../components/ui/TargetAudienceForm';
import ReviewLaunch from '../../../components/ui/ReviewLaunch';
import { useCreateCampaignMutation } from '../../../Redux/businessApis/campaign/campaignApis';

const ExistingProduct = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [createCampaign, { isLoading }] = useCreateCampaignMutation();


  useEffect(() => {
    const existingCampaign = localStorage.getItem('targetAudience');
    const existingProductId = localStorage.getItem('selectedProductId');
    if (existingCampaign || existingProductId) {
      localStorage.removeItem('targetAudience');
      localStorage.removeItem('selectedProductId');
    }
  }, []);

  const steps = [
    { id: 0, label: 'Product Selection', component: <ProductSelection /> },
    { id: 1, label: 'Target Audience', component: <TargetAudienceForm /> },
    { id: 2, label: 'Review Launch', component: <ReviewLaunch /> },
  ];


  const handleNext = () => {

    if (currentStep === 0 && !localStorage.getItem('selectedProductId')) {
      toast.dismiss()
      toast.error('Please select a product before proceeding');
      return;
    }

    if (currentStep === 1) {
      const targetAudience = JSON.parse(localStorage.getItem('targetAudience'));
      if (targetAudience === null) {
        toast.dismiss()
        toast.error('Please fill up the target audience form and save it before proceeding');
        return;
      }
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };


  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const buildCampaignPayload = () => {
    const productId = localStorage.getItem('selectedProductId');
    const raw = localStorage.getItem('targetAudience');
    const campaignData = raw ? JSON.parse(raw) : {};

    return {
      product: productId,
      name: campaignData?.name,
      reviewType: campaignData?.reviewType,
      numberOfReviewers: parseInt(campaignData?.numberOfReviewers),
      minAge: parseInt(campaignData?.minAge),
      maxAge: parseInt(campaignData?.maxAge),
      startDate: campaignData?.startDate,
      endDate: campaignData?.endDate,
      gender: campaignData?.gender,
      location: campaignData?.location,
      paymentMethod: 'Stripe',
    };
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
      'location',
      'paymentMethod',
    ];

    const missing = requiredKeys.filter((key) => !data[key]);
    if (missing.length) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
  };


  const handleSubmit = async () => {
    try {
      const payload = buildCampaignPayload();
      validatePayload(payload);

      const res = await createCampaign(payload).unwrap();
      if (res.success) {
        toast.success(res.message);
        localStorage.removeItem('selectedProductId');
        localStorage.removeItem('targetAudience');
        if (window !== undefined) {
          window.open(res?.data?.url, '_blank');
        }
      }
    } catch (err) {
      const msg = err?.data?.message || err.message || 'Something went wrong';
      toast.error(msg);
    }
  };

  return (
    <div
      className="bg-transparent"
      style={{ backgroundImage: `url(${planet1})` }}
    >

      <div className="w-full h-[70vh] max-h-[70vh] overflow-y-scroll mt-12 scrollbar">
        {steps[currentStep].component}
      </div>


      <div className="flex justify-between items-center mx-auto max-w-2xl mt-4">
        <Button
          onClick={handlePrev}
          disabled={currentStep === 0 || isLoading}
          className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </Button>

        <Button
          loading={isLoading}
          onClick={
            currentStep < steps.length - 1 ? handleNext : handleSubmit
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {currentStep < steps.length - 1 ? 'Next' : 'Confirm & Pay'}
        </Button>
      </div>
    </div>
  );
};

export default ExistingProduct;
