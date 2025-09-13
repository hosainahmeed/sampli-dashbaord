import React from 'react'
import { Button, Typography, Divider } from 'antd'
import { AppleOutlined, GoogleOutlined } from '@ant-design/icons'
import Logo from '../../../components/ui/Logo'
import { TiSocialFacebook } from 'react-icons/ti'
import InputField from '../../../components/ui/InputField'
import FormWrapper from '../../../components/ui/FormWrapper'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthSectionSignupMutation } from '../../../Redux/sampler/authSectionApis'

const { Title } = Typography

const Signup = () => {
  const navigate = useNavigate()
  const [createSampler, { isLoading }] = useAuthSectionSignupMutation()

  const onFinish = async (values) => {
    try {
      const payload = {
        name: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
      }

      const res = await createSampler(payload).unwrap()

      if (res.success) {
        toast.success(
          res.message || 'Signup successful! Check your email for verification.'
        )

        navigate('/sign-up-otp', { state: { email: values.email } })
      } else {
        toast.error(res.message || 'Signup failed. Try again.')
      }
    } catch (err) {
      toast.error(
        err?.data?.message || 'Something went wrong. Please try again.'
      )
    }
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
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: 'Please enter your name!' }]}
            placeholder="Ahsan Mahfuz"
            type="text"
          />
          <InputField
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
            placeholder="ahsan12"
            type="text"
          />
          <InputField
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email address!' },
            ]}
            placeholder="Enter your email address"
            type="email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
            placeholder="Password"
          />

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10 }}
            loading={isLoading}
          >
            Continue with Email
          </Button>
        </FormWrapper>

        <Divider className="!text-xs !text-gray-500">Or Signup with</Divider>
        <div className="grid grid-cols-3 h-16 gap-2 space-x-4">
          <button className="cursor-pointer px-6 flex items-center justify-center py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <AppleOutlined className="text-2xl" />
          </button>
          <button className="cursor-pointer px-6 flex items-center justify-center py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <GoogleOutlined className="text-2xl" />
          </button>
          <button className="cursor-pointer px-6 flex items-center justify-center py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-150">
            <TiSocialFacebook className="text-2xl" />
          </button>
        </div>

        <div className="mt-4 text-gray-500 text-[14px]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:underline text-[14px] transition-all"
          >
            Login
          </Link>
        </div>

        <div className="mt-10 text-gray-500 text-center flex items-center justify-center gap-5">
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
