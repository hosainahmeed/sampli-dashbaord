import React, { useState } from 'react'
import { Button, Typography, message, Upload, Form, Input } from 'antd'
import 'antd/dist/reset.css'
import Logo from '../../components/ui/Logo'
import { useNavigate } from 'react-router-dom'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import InputField from './InputField'
import toast from 'react-hot-toast'
import { useAddbusinessDocumentMutation } from '../../Redux/businessApis/addBussinessInfoApis'

const { Title } = Typography

const ComplianceInfo = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [certificateFileList, setCertificateFileList] = useState([])
  const [licenseFileList, setLicenseFileList] = useState([])
  const [addbusinessDocument, { isLoading }] = useAddbusinessDocumentMutation()

  // Allowed file types
  const allowedTypes = ['application/pdf', 'image/jpeg']

  const handleFileChange =
    (setFileList) =>
      ({ fileList }) => {
        const filteredFiles = fileList.filter((file) =>
          allowedTypes.includes(file.type)
        )

        if (filteredFiles.length !== fileList.length) {
          toast.error('Only PDF and JPG files are allowed!')
        }

        setFileList(filteredFiles)
      }

  const handleFileRemove = (setFileList) => () => {
    setFileList([])
  }
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const formData = new FormData()
      const data = {
        einNumber: parseInt(values.ein),
      }
      if (certificateFileList.length > 0) {
        formData.append('incorparationCertificate', certificateFileList[0].originFileObj)
      }
      if (licenseFileList.length > 0) {
        formData.append('bussinessLicense', licenseFileList[0].originFileObj)
      }
      const finalData = {
        ...data,
        ...formData
      }

      await addbusinessDocument(finalData).unwrap().then((res) => {
        if (res.success) {
          toast.success(res.message)
          navigate('/business-dashboard')
          form.resetFields()
          setCertificateFileList([])
          setLicenseFileList([])
          localStorage.removeItem('businessInfo')
          localStorage.removeItem('userInfo')
          localStorage.removeItem('email')
        } else {
          throw new Error(res.message)
        }
      })
    } catch (error) {
      toast.error(error?.message || "Something went wrong")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 gradient-container">
      <div className="gradient-ellipse "></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={2} className="text-start mb-1">
            Primary Contact and Compliance Information
          </Title>
          <h1 className="text-start text-gray-500">
            Share your primary contact details along with any relevant
            compliance information.
          </h1>
        </div>
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
            <Form.Item
              label="Certificate of Incorporation *"
              className="!w-full"
            >
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

            {/* Business License Upload */}
            <Form.Item label="Business License *" className="!w-full">
              {licenseFileList.length > 0 ? (
                <div className="border rounded-lg p-3 flex justify-between items-center bg-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        licenseFileList[0].type === 'application/pdf'
                          ? 'https://img.icons8.com/fluency/48/000000/pdf.png'
                          : URL.createObjectURL(
                            licenseFileList[0].originFileObj
                          )
                      }
                      alt="File Icon"
                      className="w-10 h-10"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {licenseFileList[0].name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(licenseFileList[0].size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="link"
                      onClick={handleFileRemove(setLicenseFileList)}
                    >
                      Delete
                    </Button>
                    <Upload
                      multiple={false}
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={handleFileChange(setLicenseFileList)}
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
                  onChange={handleFileChange(setLicenseFileList)}
                  accept=".pdf,.jpg"
                >
                  <Button
                    icon={<UploadOutlined />}
                    className="bg-[#21B6F2] text-white"
                  >
                    Upload License
                  </Button>
                </Upload>
              )}
            </Form.Item>

            {/* Submit Button */}
            <Button
              loading={isLoading}
              disabled={isLoading}
              className="w-full bg-blue-500 text-white"
              type="primary"
              htmlType="submit"
            >
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ComplianceInfo
