import React, { useState } from 'react';
import InputField from '../../../components/ui/InputField';
import FormWrapper from '../../../components/ui/FormWrapper';
import { Button, DatePicker, Select } from 'antd';
import toast from 'react-hot-toast';
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
  { label: '18yrs - 20yrs', value: '18-20' },
  { label: '21yrs - 25yrs', value: '21-25' },
  { label: '26yrs - 30yrs', value: '26-30' },
  { label: '31yrs - 35yrs', value: '31-35' },
  { label: '36yrs - 40yrs', value: '36-40' },
  { label: '41yrs - 45yrs', value: '41-45' },
  { label: '46yrs - 50yrs', value: '46-50' },
  { label: '51yrs - 55yrs', value: '51-55' },
  { label: '56yrs - 60yrs', value: '56-60' },
  { label: '61yrs - 65yrs', value: '61-65' },
  { label: '66yrs - 70yrs', value: '66-70' },
  { label: '71yrs - 75yrs', value: '71-75' },
  { label: '76yrs - 80yrs', value: '76-80' },
  { label: '81yrs - 85yrs', value: '81-85' },
  { label: '86yrs - 90yrs', value: '86-90' },
  { label: '91yrs - 95yrs', value: '91-95' },
  { label: '96yrs - 100yrs', value: '96-100' },
  { label: '101yrs - 105yrs', value: '101-105' },
  { label: '106yrs - 110yrs', value: '106-110' },
  { label: '111yrs - 115yrs', value: '111-115' },
  { label: '116yrs - 120yrs', value: '116-120' },
];

const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

function EditCampaign() {
  const [formData, setFormData] = useState({
    name: '',
    costPerReview: '',
    audienceSize: '',
    location: '',
    ageMin: '',
    ageMax: '',
    gender: 'Male',
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
            'MMM DD, YYYY'
          )} - ${formData.timelineEnd.format('MMM DD, YYYY')}`
        : '';

    const finalData = {
      ...formData,
      timeline,
    };

    localStorage.setItem('targetAudience', JSON.stringify(finalData));
    toast.success('Data saved successfully!');
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <FormWrapper className="grid grid-cols-1 gap-4">
        <InputField
          label="Campaign Name"
          placeholder="Campaign name"
          required
          className="py-2"
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Amount Paid for Each Review"
            placeholder="$5"
            required
            className="py-2"
            onChange={(e) => handleChange('costPerReview', e.target.value)}
          />
          <InputField
            label="Number of Reviewers"
            placeholder="Number of Reviewers"
            required
            className="py-2"
            onChange={(e) => handleChange('audienceSize', e.target.value)}
          />
        </div>

        <InputField
          label="Location"
          placeholder="Location"
          required
          onChange={(e) => handleChange('location', e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <DynamicSelect
            label="Age Min Range"
            placeholder="Min age"
            options={ageRangeOptions}
            required
            onChange={(value) => handleChange('ageMin', value)}
          />
          <DynamicSelect
            label="Age Max Range"
            placeholder="Max age"
            options={ageRangeOptions}
            required
            onChange={(value) => handleChange('ageMax', value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DynamicDatePicker
            label="Timeline Start"
            placeholder="Start date"
            required
            onChange={(date) => handleChange('timelineStart', date)}
          />
          <DynamicDatePicker
            label="Timeline End"
            placeholder="End date"
            required
            onChange={(date) => handleChange('timelineEnd', date)}
          />
        </div>

        <DynamicSelect
          label="Gender"
          defaultValue="Male"
          options={genderOptions}
          required
          onChange={(value) => handleChange('gender', value)}
        />

        <Button type="primary" className="mt-4 w-full" onClick={handleSubmit}>
          Save Data
        </Button>
      </FormWrapper>
    </div>
  );
}

export default EditCampaign;
