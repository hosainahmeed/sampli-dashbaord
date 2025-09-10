import React from 'react'
import { Button, Typography, message } from 'antd'
import 'antd/dist/reset.css'
import Logo from '../../components/ui/Logo'
import InputField from '../../components/ui/InputField'
import FormWrapper from '../../components/ui/FormWrapper'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAddBussinessInfoMutation } from '../../Redux/businessApis/addBussinessInfoApis'

const { Title } = Typography

const UserInfo = () => {
  const router = useNavigate()
  const [addBussinessInfo, { loading }] = useAddBussinessInfoMutation()
  const onFinish = async (values) => {
    try {
      const businessInfo = JSON.parse(localStorage.getItem('businessInfo'))
      const data = {
        ...values,
        ...businessInfo,
      }
      const businessInfoData = {
        bussinessName: data?.legalBusinessName,
        email: data?.email,
        tradeName: data?.tradeName,
        bussinessType: data?.businessType,
        industryType: data?.businessSector,
        bussinessAddress: data?.businessAddress,
        phoneNumber: data?.phone,
        website: data?.website,
        taxtIndentificationNumber: data?.taxId
      }
      await addBussinessInfo(businessInfoData).unwrap().then((res) => {
        if (res.success) {
          toast.success(res.message)
          router('/contact-info')
        }
      })

    } catch (error) {
      toast.error(error?.data?.message)
    }

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 gradient-container">
      <div className="gradient-ellipse "></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={2} className="mb-1">
            Please provide your business info
          </Title>
          <h1 className="text-[var(--body-text)] text-start">
            Share key details about your business.
          </h1>
        </div>

        <FormWrapper onFinish={onFinish}>
          <InputField
            type="number"
            className="text-start"
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please enter your phone number!' },
            ]}
            placeholder="Phone number"
          />
          <InputField
            className="text-start"
            label="Website"
            name="website"
            rules={[{ required: true, message: 'Please enter your website!' }]}
            placeholder="Website URL"
          />
          <InputField
            className="text-start"
            label="Tax Identification number"
            name="taxId"
            rules={[{ required: true, message: 'Please enter your tax ID!' }]}
            placeholder="Tax Identification number"
          />

          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10 }}
          >
            Continue with Email
          </Button>
        </FormWrapper>
      </div>
    </div>
  )
}

export default UserInfo
