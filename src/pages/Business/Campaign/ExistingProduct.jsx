import React, { useState } from "react";
import ProductSelection from "../Product/ProductSelection";
import planet1 from "../../../assets/Planet (1).png";
import { Button } from "antd";
import ReviewLaunch from "../../../components/ui/ReviewLaunch";
import TargetAudienceForm from "../../../components/ui/TargetAudienceForm";

function ExistingProduct() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 0, component: <ProductSelection /> },
    { id: 1, component: <TargetAudienceForm /> },
    { id: 2, component: <ReviewLaunch /> },
  ];

  // Step navigation
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-transparent" style={{ backgroundImage: `url(${planet1})` }}>
      <div className="w-full h-[70vh] max-h-[70vh] scrollbar overflow-y-scroll mt-12">
        {steps[currentStep].component}
      </div>

      <div className="flex justify-between items-center mx-auto max-w-2xl mt-4">
        <Button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </Button>

        <Button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {currentStep < steps.length - 1 ? "Next" : "Confirm & Publish"}
        </Button>
      </div>
    </div>
  );
}

export default ExistingProduct;
