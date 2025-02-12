import React from "react";
import { Input, Select, DatePicker, Button } from "antd";
import InputField from "./InputField";
import FormWrapper from "./FormWrapper";

const { Option } = Select;

const TargetAudienceForm = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">
        Target Your Audience and Set Timelines
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Define who should review your product and when
      </p>

      <FormWrapper className="grid grid-cols-1 gap-4">
        <InputField placeholder="Campaign name" className="py-2" />

        <div className="grid grid-cols-2 gap-4">
          <InputField placeholder="$5" disabled className="py-2" />
          <InputField placeholder="Number of Reviewers" className="py-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select placeholder="Min age" className="w-full">
            {[...Array(100).keys()].map((age) => (
              <Option key={age + 1} value={age + 1}>
                {age + 1}
              </Option>
            ))}
          </Select>
          <Select placeholder="Max age" className="w-full">
            {[...Array(100).keys()].map((age) => (
              <Option key={age + 1} value={age + 1}>
                {age + 1}
              </Option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DatePicker placeholder="Start date" className="w-full" />
          <DatePicker placeholder="End date" className="w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select defaultValue="Male" className="w-full">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
          <InputField placeholder="Location" className="py-2" />
        </div>

        <div className="flex justify-between mt-4">
          <Button className="bg-gray-200 px-6 py-2 rounded-md">Back</Button>
          <Button type="primary" className="bg-blue-600 px-6 py-2 rounded-md">
            Next
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default TargetAudienceForm;
