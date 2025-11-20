import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { setCampaignData } from '../../Redux/slices/CampaingSlice';

const { Option } = Select;

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Both', value: 'both' },
  { label: 'Other', value: 'other' },
];

const initialFormState = {
  name: null,
  reviewType: null,
  numberOfReviewers: null,
  minAge: null,
  maxAge: null,
  gender: null,
  startDate: null,
  endDate: null,
};

const TargetAudienceForm = () => {
  const dispatch = useDispatch();
  const campaignData = useSelector((state) => state.campaign);

  const [formData, setFormData] = useState(initialFormState);
  const [isInitialized, setIsInitialized] = useState(false);

  const parsedCampaignData = useMemo(() => {
    if (!campaignData) return initialFormState;
    return {
      name: campaignData.name || null,
      reviewType: campaignData.reviewType || null,
      numberOfReviewers: campaignData.numberOfReviewers || null,
      minAge: campaignData.minAge || null,
      maxAge: campaignData.maxAge || null,
      gender: campaignData.gender || null,
      startDate: campaignData.startDate ? dayjs(campaignData.startDate) : null,
      endDate: campaignData.endDate ? dayjs(campaignData.endDate) : null,
    };
  }, [campaignData]);


  useEffect(() => {
    if (!isInitialized) {
      setFormData(parsedCampaignData);
      setIsInitialized(true);
    }
  }, [parsedCampaignData, isInitialized]);

  const autoSaveToRedux = useCallback(
    (data) => {
      try {
        const campaignFormData = {
          name: data.name,
          reviewType: data.reviewType,
          numberOfReviewers: data.numberOfReviewers ? parseInt(data.numberOfReviewers, 10) : null,
          minAge: data.minAge ? parseInt(data.minAge, 10) : null,
          maxAge: data.maxAge ? parseInt(data.maxAge, 10) : null,
          gender: data.gender,
          startDate: data.startDate
            ? typeof data.startDate === 'string'
              ? data.startDate
              : data.startDate.toISOString()
            : null,
          endDate: data.endDate
            ? typeof data.endDate === 'string'
              ? data.endDate
              : data.endDate.toISOString()
            : null,
        };

        dispatch(setCampaignData(campaignFormData));
      } catch (error) {
        toast.error('Failed to save campaign data');
      }
    },
    [dispatch]
  );


  const handleChange = (key, value) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    
    const isDate = key === 'startDate' || key === 'endDate';
    
    // Always save changes, but use a small debounce for non-date fields
    const timer = setTimeout(() => {
      autoSaveToRedux(updated);
    }, isDate ? 0 : 500);

    return () => clearTimeout(timer);
  };

  const handleImmediateChange = (key, value) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    autoSaveToRedux(updated);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">
        Target Your Audience and Set Timelines
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Define who should review your product and when
      </p>

      <Form requiredMark={false} layout="vertical">
        <Form.Item label="Campaign Name" required>
          <Input
            size="large"
            placeholder="Campaign name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Review Type" required>
          <Select
            size="large"
            placeholder="Review type"
            value={formData.reviewType}
            onChange={(v) => handleChange('reviewType', v)}
          >
            <Option value="image">Image</Option>
            <Option value="video">Video</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Number of Reviewers" required>
          <Input
            size="large"
            type="number"
            placeholder="Number of reviewers"
            value={formData.numberOfReviewers}
            onChange={(e) => handleChange('numberOfReviewers', e.target.value)}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Age Min Range" required>
            <Select
              size="large"
              value={formData.minAge}
              placeholder="Age min range"
              onChange={(v) => handleChange('minAge', v)}
            >
              {Array.from({ length: 83 }, (_, i) => (
                <Option key={i + 18} value={i + 18}>
                  {i + 18}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Age Max Range" required>
            <Select
              size="large"
              value={formData.maxAge}
              placeholder="Age max range"
              onChange={(v) => handleChange('maxAge', v)}
            >
              {Array.from({ length: 83 }, (_, i) => (
                <Option key={i + 18} value={i + 18}>
                  {i + 18}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Timeline Start" required>
            <DatePicker
              size="large"
              className="w-full"
              value={formData.startDate}
              onChange={(date) => handleChange('startDate', date)}
            />
          </Form.Item>

          <Form.Item label="Timeline End" required>
            <DatePicker
              size="large"
              className="w-full"
              value={formData.endDate}
              onChange={(date) => handleChange('endDate', date)}
            />
          </Form.Item>
        </div>

        <Form.Item label="Gender" required>
          <Select
            size="large"
            value={formData.gender}
            onChange={(v) => handleImmediateChange('gender', v)}
            placeholder="Gender"
          >
            {genderOptions.map((g) => (
              <Option key={g.value} value={g.value}>
                {g.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(TargetAudienceForm);
