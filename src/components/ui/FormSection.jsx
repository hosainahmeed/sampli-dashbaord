import React from "react";
import { Form } from "antd";
import InputField from "../ui/InputField";
import SelectField from "../page-Component/SelectField";

const FormSection = ({ fields }) => {
  return (
    <Form.Item>
      {fields.map((field, index) => (
        <div key={index} className={field.className || "py-2"}>
          {field.type === "select" ? (
            <SelectField
              label={field.label}
              placeholder={field.placeholder}
              options={field.options}
            />
          ) : (
            <InputField
              label={field.label}
              placeholder={field.placeholder}
              rules={field.rules}
            />
          )}
        </div>
      ))}
    </Form.Item>
  );
};

export default FormSection;