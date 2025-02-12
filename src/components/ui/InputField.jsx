import React, { useState } from "react";
import { Input, Form, Button } from "antd";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";

const InputField = ({
  label,
  name,
  rules,
  placeholder,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form.Item label={label} name={name} rules={rules} {...props}>
      <Input
        className="h-8"
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        suffix={
          type === "password" && (
            <Button
              type="link"
              icon={showPassword ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              onClick={() => setShowPassword(!showPassword)}
            />
          )
        }
      />
    </Form.Item>
  );
};

export default InputField;
