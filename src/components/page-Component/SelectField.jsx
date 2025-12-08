import React from "react";
import { Select, Form } from "antd";

const { Option } = Select;

const SelectField = ({
  label,
  name,
  rules,
  options = [],
  placeholder,
  onChange,
  loading,
  disabled = false,
  showSearch = false,
  optionFilterProp = 'children',
  filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
  ...props
}) => {
  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Form.Item className="flex items-start justify-start" label={label} name={name} rules={rules} {...props}>
      <Select 
        size="large" 
        loading={loading} 
        placeholder={placeholder} 
        onChange={handleChange} 
        disabled={disabled}
        showSearch={showSearch}
        optionFilterProp={optionFilterProp}
        filterOption={filterOption}
        style={{ width: '100%' }}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value} label={option.label}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectField;
