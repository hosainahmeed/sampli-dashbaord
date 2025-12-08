import React from "react";
import { Input, Form } from "antd";

const InputField = ({
  label,
  name,
  rules,
  placeholder,
  type = "text",
  size = "large",
  ...props
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules} {...props}>
      {type === "password" ? <Input.Password
        size={size}
        type={type}
        placeholder={placeholder}
      /> : <Input
        size={size || "large"}
        type={type}
        placeholder={placeholder}
      />}
    </Form.Item>
  );
};

export default InputField;
