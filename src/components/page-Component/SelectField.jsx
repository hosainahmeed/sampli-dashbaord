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
  ...props
}) => {
  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Form.Item className="flex items-start justify-start" label={label} name={name} rules={rules} {...props}>
      <Select placeholder={placeholder} onChange={handleChange}>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectField;
