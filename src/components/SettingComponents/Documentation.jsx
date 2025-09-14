import React, { useState } from 'react';
import { Button,  Upload, Form, Card } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import InputField from '../ui/InputField';
import toast from 'react-hot-toast';

const Documentation = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [certificateFileList, setCertificateFileList] = useState([]);
  const [licenseFileList, setLicenseFileList] = useState([]);

  // Allowed file types
  const allowedTypes = ['application/pdf', 'image/jpeg'];

  const handleFileChange =
    (setFileList) =>
    ({ fileList }) => {
      const filteredFiles = fileList.filter((file) =>
        allowedTypes.includes(file.type)
      );

      if (filteredFiles.length !== fileList.length) {
        toast.dismiss()
        toast.error('Only PDF and JPG files are allowed!');
      }

      setFileList(filteredFiles);
    };

  const handleFileRemove = (setFileList) => () => {
    setFileList([]);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('ein', values.ein);

      if (certificateFileList.length > 0) {
        formData.append('certificate', certificateFileList[0].originFileObj);
      }
      if (licenseFileList.length > 0) {
        formData.append('license', licenseFileList[0].originFileObj);
      }

      console.log('Form Data:', {
        EIN: values.ein,
        Certificate: certificateFileList[0]?.originFileObj,
        License: licenseFileList[0]?.originFileObj,
      });

      // Simulating a server request
      toast.dismiss()
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Please fill out all fields correctly.');
    }
  };

  return (
    <Card className="h-fit shadow-md">
      <Form
        requiredMark={false}
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div className="space-y-6">
          <InputField
            className="text-start"
            label="EIN *"
            name="ein"
            rules={[{ required: true, message: 'Please enter your EIN!' }]}
            placeholder="EIN number"
            type="number"
          />

          {/* Certificate of Incorporation Upload */}
          <Form.Item label="Certificate of Incorporation *" className="!w-full">
            {certificateFileList.length > 0 ? (
              <div className="border rounded-lg p-3 flex justify-between items-center bg-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      certificateFileList[0].type === 'application/pdf'
                        ? 'https://img.icons8.com/fluency/48/000000/pdf.png'
                        : URL.createObjectURL(
                            certificateFileList[0].originFileObj
                          )
                    }
                    alt="File Icon"
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {certificateFileList[0].name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(certificateFileList[0].size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="link"
                    onClick={handleFileRemove(setCertificateFileList)}
                  >
                    Delete
                  </Button>
                  <Upload
                    multiple={false}
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleFileChange(setCertificateFileList)}
                    accept=".pdf,.jpg"
                  >
                    <Button type="link">Reupload</Button>
                  </Upload>
                </div>
              </div>
            ) : (
              <Upload
                listType="picture-card"
                multiple={false}
                beforeUpload={() => false}
                showUploadList={false}
                onChange={handleFileChange(setCertificateFileList)}
                accept=".pdf,.jpg"
              >
                <Button
                  icon={<UploadOutlined />}
                  className="bg-[#21B6F2] text-white"
                >
                  Upload Certificate
                </Button>
              </Upload>
            )}
          </Form.Item>
          {/* Submit Button */}
          <div className="flex items-center justify-end">
            <Button
              className="w-fit bg-blue-500 text-white"
              type="primary"
              htmlType="submit"
            >
              save
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default Documentation;
