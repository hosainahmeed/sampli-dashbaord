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
      size='large'
      placeholder={placeholder || 'Select an option'}
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
// 'male', 'female', 'other', 'both
const TargetAudienceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    reviewType: '',
    numberOfReviewers: '',
    location: '',
    minAge: '',
    maxAge: '',
    gender: 'male',
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
    const requiredFields = ['name', 'reviewType', 'numberOfReviewers', 'location', 'minAge', 'maxAge', 'gender', 'startDate', 'endDate'];
    if (requiredFields.some(field => !formData[field])) {
      toast.dismiss()
      const missingFields = requiredFields.filter(field => !formData[field]);
      const plural = missingFields.length > 1;
      const errorMessage = `Please fill in the ${plural ? 'fields' : 'field'} ${missingFields.map(field => `"${field}"`).join(', ')}`;
      toast.error(errorMessage);
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

    if (finalData?.startDate > finalData?.endDate) {
      toast.dismiss();
      toast.error('Start date cannot be greater than end date');
      return;
    }

    const start = new Date(finalData?.startDate);
    const end = new Date(finalData?.endDate);

    const diffInMs = end - start;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 21) {
      toast.dismiss();
      toast.error('The duration between start and end date must be at least 3 weeks (21 days)');
      return;
    }

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

        <div className="grid grid-cols-2  gap-4">
          <div className='col-span-2'>
            <DynamicSelect
              label="Review Type"
              placeholder="Review Type"
              options={[
                { label: 'Image ($5 each)', value: 'image' },
                { label: 'Video ($10 each)', value: 'video' },
              ]}
              required
              value={formData.reviewType}
              onChange={(value) => handleChange('reviewType', value)}
            />

          </div>
          <div className='col-span-2'>
            <InputField
              label="Number of Reviewers"
              placeholder="Number of Reviewers"
              required
              type='number'
              value={formData.numberOfReviewers}
              onChange={(e) => handleChange('numberOfReviewers', e.target.value)}
            />
          </div>
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
            options={Array.from({ length: 83 }, (_, i) => ({ label: `${i + 18}`, value: i + 18 }))}
            required
            value={formData.minAge}
            onChange={(value) => handleChange('minAge', value)}
          />
          <DynamicSelect
            label="Age Max Range"
            placeholder="Max age"
            options={Array.from({ length: 83 }, (_, i) => ({ label: `${i + 18}`, value: i + 18 }))}
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
