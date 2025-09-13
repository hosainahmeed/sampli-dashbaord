import React, { useEffect, useState } from 'react';
import { Select, DatePicker, Button } from 'antd';
import InputField from './InputField';
import FormWrapper from './FormWrapper';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const { Option } = Select;

const DynamicSelect = ({ label, options, placeholder, onChange, value, ...rest }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}
    <Select
      placeholder={placeholder}
      className="w-full"
      required
      value={value}
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

const DynamicDatePicker = ({ label, placeholder, onChange, value, ...rest }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}
    <DatePicker
      placeholder={placeholder}
      className="w-full"
      required
      value={value}
      onChange={onChange}
      {...rest}
    />
  </div>
);

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Both', value: 'both' },
  { label: 'Other', value: 'other' },
];

const TargetAudienceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    amountForEachReview: '',
    numberOfReviewers: '',
    location: '',
    minAge: '',
    maxAge: '',
    gender: 'Male',
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem('targetAudience');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData({
        ...parsed,
        startDate: parsed.startDate ? dayjs(parsed.startDate) : null,
        endDate: parsed.endDate ? dayjs(parsed.endDate) : null,
      });
    }
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.amountForEachReview || !formData.numberOfReviewers) {
      toast.error('Please fill in all required fields');
      return;
    }

    const timeline =
      formData.startDate && formData.endDate
        ? `${formData.startDate.format('MMM DD, YYYY')} - ${formData.endDate.format('MMM DD, YYYY')}`
        : '';

    const finalData = {
      ...formData,
      startDate: formData.startDate ? formData.startDate.toISOString() : null,
      endDate: formData.endDate ? formData.endDate.toISOString() : null,
      timeline,
    };

    localStorage.setItem('targetAudience', JSON.stringify(finalData));
    toast.success('Data saved successfully!');
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
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Amount Paid for Each Review"
            placeholder="$5"
            required
            type='number'
            value={formData.amountForEachReview}
            onChange={(e) => handleChange('amountForEachReview', e.target.value)}
          />
          <InputField
            label="Number of Reviewers"
            placeholder="Number of Reviewers"
            required
            type='number'
            value={formData.numberOfReviewers}
            onChange={(e) => handleChange('numberOfReviewers', e.target.value)}
          />
        </div>

        <InputField
          label="Location"
          placeholder="Location"
          required
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <DynamicSelect
            label="Age Min Range"
            placeholder="Min age"
            options={Array.from({ length: 100 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
            required
            value={formData.minAge}
            onChange={(value) => handleChange('minAge', value)}
          />
          <DynamicSelect
            label="Age Max Range"
            placeholder="Max age"
            options={Array.from({ length: 100 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
            required
            value={formData.maxAge}
            onChange={(value) => handleChange('maxAge', value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DynamicDatePicker
            label="Timeline Start"
            placeholder="Start date"
            required
            value={formData.startDate}
            onChange={(date) => handleChange('startDate', date)}
          />
          <DynamicDatePicker
            label="Timeline End"
            placeholder="End date"
            required
            value={formData.endDate}
            onChange={(date) => handleChange('endDate', date)}
          />
        </div>

        <DynamicSelect
          label="Gender"
          placeholder="Gender"
          options={genderOptions}
          required
          value={formData.gender}
          onChange={(value) => handleChange('gender', value)}
        />

        <Button type="primary" className="mt-4 w-full" onClick={handleSubmit}>
          Save Data
        </Button>
      </FormWrapper>
    </div>
  );
};

export default React.memo(TargetAudienceForm);
