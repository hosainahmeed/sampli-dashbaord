import React from "react";
import { Form } from "antd";

const FormWrapper = ({ children, onFinish, layout = "vertical", form, ...props }) => {
  return (
    <Form form={form} requiredMark={false} layout={layout} onFinish={onFinish} {...props}>
      {children}
    </Form>
  );
};

export default FormWrapper;
