import React, { useEffect, useState } from 'react';
import { Button, Upload, Form, Card } from 'antd';
import 'antd/dist/reset.css';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useUpdateProfileMutation } from '../../Redux/businessApis/business _profile/getprofileApi';
const Documentation = ({ data }) => {
  const [form] = Form.useForm();
  const [certificateFileList, setCertificateFileList] = useState([]);
  const [licenseFileList, setLicenseFileList] = useState([]);
  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();

  const allowedTypes = ['application/pdf'];

  useEffect(() => {
    if (data?.incorparationCertificate) {
      setCertificateFileList([
        {
          uid: '-1',
          name: 'Incorporation Certificate',
          status: 'done',
          url: data?.incorparationCertificate,
          type: 'application/pdf' || 'image/jpeg',
        },
      ]);
    }

    if (data?.bussinessLicense) {
      setLicenseFileList([
        {
          uid: '-2',
          name: 'Business License',
          status: 'done',
          url: data?.bussinessLicense,
          type: 'application/pdf' || 'image/jpeg',
        },
      ]);
    }
  }, [data]);

  const handleFileChange = (setFileList) => ({ fileList }) => {
    const filteredFiles = fileList.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (filteredFiles.length !== fileList.length) {
      toast.dismiss();
      toast.error('Only PDF and JPG files are allowed!');
    }

    setFileList(filteredFiles);
  };

  // const handleFileRemove = (setFileList) => () => {
  //   setFileList([]);
  // };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (certificateFileList?.[0]?.originFileObj) {
        formData.append('incorparationCertificate', certificateFileList[0]?.originFileObj);
      }
      if (licenseFileList?.[0]?.originFileObj) {
        formData.append('bussinessLicense', licenseFileList[0]?.originFileObj);
      }
      await updateProfile(formData).unwrap().then((res) => {
        if (res?.success) {
          toast.dismiss()
          toast.success(res?.message || "Business updated successfully!")
        }
      })
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Something went wrong!");
    }
  };

  const renderPreview = (file) => {
    if (!file) return null;
    if (file.type === 'application/pdf') {
      return (
        <iframe
          src={file.url || URL.createObjectURL(file.originFileObj)}
          title={file.name}
          width="100%"
          height="200px"
        />
      );
    }
  };

  return (
    <Card className="h-fit">
      <Form form={form} requiredMark={true} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Certificate of Incorporation">
          {certificateFileList.length > 0 ? (
            <div className="border border-gray-300 rounded-lg p-3 bg-gray-100">
              {renderPreview(certificateFileList[0])}
              {/* <div className="flex justify-end gap-2 mt-2">
                <Button
                  type="link"
                  onClick={handleFileRemove(setCertificateFileList)}
                >
                  Delete
                </Button>
              </div> */}
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
              <Button icon={<UploadOutlined />}>Upload Certificate</Button>
            </Upload>
          )}
        </Form.Item>


        <Form.Item label="Business License">
          {licenseFileList.length > 0 ? (
            <div className="border border-gray-300 rounded-lg p-3 bg-gray-100">
              {renderPreview(licenseFileList[0])}
              {/* <div className="flex justify-end gap-2 mt-2">
                <Button
                  type="link"
                  onClick={handleFileRemove(setLicenseFileList)}
                >
                  Delete
                </Button>
              </div> */}
            </div>
          ) : (
            <Upload
              listType="picture-card"
              multiple={false}
              beforeUpload={() => false}
              showUploadList={false}
              onChange={handleFileChange(setLicenseFileList)}
              accept=".pdf,.jpg"
            >
              <Button icon={<UploadOutlined />}>Upload License</Button>
            </Upload>
          )}
        </Form.Item>

        <div className="flex justify-end">
          <Button loading={updateProfileLoading} disabled={updateProfileLoading} type="primary" htmlType="submit" className="bg-blue-500 text-white">
            Save
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Documentation;
