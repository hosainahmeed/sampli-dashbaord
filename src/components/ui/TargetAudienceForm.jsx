import React, { useState } from "react";
import { Input, Select, DatePicker, Button } from "antd";
import InputField from "./InputField";
import FormWrapper from "./FormWrapper";
import toast from "react-hot-toast";

const { Option } = Select;

const DynamicSelect = ({ label, options, placeholder, onChange, ...rest }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}
    <Select
      placeholder={placeholder}
      className="w-full"
      required
      onChange={onChange}
      {...rest}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  </div>
);

const DynamicDatePicker = ({ label, placeholder, onChange, ...rest }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}
    <DatePicker
      placeholder={placeholder}
      className="w-full"
      required
      onChange={onChange}
      {...rest}
    />
  </div>
);

const ageRangeOptions = [
  { label: "18yrs - 20yrs", value: "18-20" },
  { label: "21yrs - 25yrs", value: "21-25" },
  { label: "26yrs - 30yrs", value: "26-30" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const TargetAudienceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    costPerReview: "",
    audienceSize: "",
    location: "",
    ageMin: "",
    ageMax: "",
    gender: "Male",
    timelineStart: null,
    timelineEnd: null,
    selectedProducts: [],
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const timeline =
      formData.timelineStart && formData.timelineEnd
        ? `${formData.timelineStart.format(
            "MMM DD, YYYY"
          )} - ${formData.timelineEnd.format("MMM DD, YYYY")}`
        : "";

    const finalData = {
      ...formData,
      timeline,
    };

    localStorage.setItem("targetAudience", JSON.stringify(finalData));
    toast.success("Data saved successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">
        Target Your Audience and Set Timelines
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Define who should review your product and when
      </p>

      <FormWrapper className="grid grid-cols-1 gap-4">
        <InputField
          label="Campaign Name"
          placeholder="Campaign name"
          required
          className="py-2"
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Amount Paid for Each Review"
            placeholder="$5"
            required
            className="py-2"
            onChange={(e) => handleChange("costPerReview", e.target.value)}
          />
          <InputField
            label="Number of Reviewers"
            placeholder="Number of Reviewers"
            required
            className="py-2"
            onChange={(e) => handleChange("audienceSize", e.target.value)}
          />
        </div>

        <InputField
          label="Location"
          placeholder="Location"
          required
          onChange={(e) => handleChange("location", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <DynamicSelect
            label="Age Min Range"
            placeholder="Min age"
            options={ageRangeOptions}
            required
            onChange={(value) => handleChange("ageMin", value)}
          />
          <DynamicSelect
            label="Age Max Range"
            placeholder="Max age"
            options={ageRangeOptions}
            required
            onChange={(value) => handleChange("ageMax", value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DynamicDatePicker
            label="Timeline Start"
            placeholder="Start date"
            required
            onChange={(date) => handleChange("timelineStart", date)}
          />
          <DynamicDatePicker
            label="Timeline End"
            placeholder="End date"
            required
            onChange={(date) => handleChange("timelineEnd", date)}
          />
        </div>

        <DynamicSelect
          label="Gender"
          defaultValue="Male"
          options={genderOptions}
          required
          onChange={(value) => handleChange("gender", value)}
        />

        <Button type="primary" className="mt-4 w-full" onClick={handleSubmit}>
          Save Data
        </Button>
      </FormWrapper>
    </div>
  );
};

export default React.memo(TargetAudienceForm);
