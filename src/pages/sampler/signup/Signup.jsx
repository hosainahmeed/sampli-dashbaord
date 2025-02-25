import React from 'react'
import { Button, Typography, Divider } from 'antd'
import { AppleOutlined, GoogleOutlined } from '@ant-design/icons'
import Logo from '../../../components/ui/Logo'
import { TiSocialFacebook } from 'react-icons/ti'
import InputField from '../../../components/ui/InputField'
import FormWrapper from '../../../components/ui/FormWrapper'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const { Title } = Typography

const Signup = () => {
  const Navigate = useNavigate()
  const onFinish = (values) => {
    console.log(values)
    toast.success('Sent otp to your email!')
    Navigate('/sign-up-otp')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 gradient-container">
      <div className="gradient-ellipse"></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={2}>Sign Up </Title>
          <h1 className="text-[var(--body-text)] leading-0">
            Create an account to access all features on Sampli
          </h1>
        </div>

        <FormWrapper onFinish={onFinish}>
          <InputField
            label="Full Name  "
            name="fullname"
            rules={[
              { required: true, message: 'Please enter your name!' },
              { type: 'name', message: 'Enter a valid full name!' },
            ]}
            placeholder="Ahsan Mahfuz"
            type="name"
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          />
          <InputField
            label="Username  "
            name="username"
            rules={[
              { required: true, message: 'Please enter your username!' },
              { type: 'username', message: 'Enter a valid username!' },
            ]}
            placeholder="ahsan12"
            type="username"
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          />

          <InputField
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email address!' },
            ]}
            placeholder="MichealScott@gmail.com"
            type="email"
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
            placeholder="Password"
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          />

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10 }}
          >
            Continue with Email
          </Button>
        </FormWrapper>

        <Divider className="!text-xs !text-gray-500">Or Signup with</Divider>
        <div className="grid grid-cols-3 h-16 gap-2 space-x-4">
          <button className="cursor-pointer px-6 flex items-center justify-center  py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <AppleOutlined className="text-2xl" />
          </button>
          <button className="cursor-pointer px-6 flex items-center justify-center  py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <GoogleOutlined className="text-2xl" />
          </button>
          <button className=" cursor-pointer px-6 flex items-center justify-center  py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <TiSocialFacebook className="text-2xl" />
          </button>
        </div>

        <div className="mt-4 text-gray-500 text-[14px]">
          Already have an account?{' '}
          <Link
            to="/register"
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

export default Signup
