import React from 'react'
import { Button, Typography, Divider, Form, Select } from 'antd'
import { AppleOutlined, GoogleOutlined } from '@ant-design/icons'
import Logo from '../../../components/ui/Logo'
import { TiSocialFacebook } from 'react-icons/ti'
import InputField from '../../../components/ui/InputField'
import FormWrapper from '../../../components/ui/FormWrapper'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { IoMdArrowRoundBack } from 'react-icons/io'

const { Title } = Typography

const SignUpMoreInformation = () => {
  const Navigate = useNavigate()
  const onFinish = (values) => {
    console.log(values)
    toast.success('Sent otp to your email!')
    Navigate('/sign-up-otp')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div
          className="flex items-center text-gray-500 gap-2 my-2 cursor-pointer text-xl  hover:text-blue-500"
          onClick={() => Navigate(-1)}
        >
          <IoMdArrowRoundBack />
          <div>back</div>
        </div>
        <div className="flex mb-6 flex-col items-start">
          <Title level={2}>Please provide your information</Title>
          <h1 className="text-[var(--body-text)] ">
            You are new here, let’s know a bit about you.
          </h1>
        </div>

        <FormWrapper onFinish={onFinish}>
          <InputField
            label="City  "
            name="city"
            rules={[{ required: true, message: 'Please enter your city!' }]}
            placeholder="city"
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          />
          <InputField
            label="Zip Code  "
            name="zipcode"
            rules={[{ required: true, message: 'Please enter your zipcode!' }]}
            placeholder="zipcode"
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          />

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: 'Please select your gender!',
              },
            ]}
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Select placeholder="Select your gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
                message: 'Please select your age!',
              },
            ]}
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Select placeholder="Select your age">
              {Array.from({ length: 150 }).map((_, i) => (
                <Select.Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10 }}
          >
            Continue
          </Button>
        </FormWrapper>

        <div className="mt-4 text-gray-500 text-[14px]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:underline  text-[14px] transition-all"
          >
            Login
          </Link>
        </div>

        <div className="mt-10 text-gray-500 text-center flex items-center justify-center gap-5 ">
          <Link to="/" className="text-blue-500 hover:underline transition-all">
            Help
          </Link>
          <Link to="/" className="text-blue-500 hover:underline transition-all">
            Privacy
          </Link>
          <Link to="/" className="text-blue-500 hover:underline transition-all">
            Terms
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpMoreInformation
