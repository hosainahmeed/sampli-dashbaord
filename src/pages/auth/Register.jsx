import React from 'react'
import { Form, Input, Button, Typography, Divider, message } from 'antd'
import { AppleOutlined, GoogleOutlined } from '@ant-design/icons'
import 'antd/dist/reset.css'
import Logo from '../../components/ui/Logo'
import { TiSocialFacebook } from 'react-icons/ti'
import InputField from '../../components/ui/InputField'
import FormWrapper from '../../components/ui/FormWrapper'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useRegisterAsBusinessMutation } from '../../Redux/authApis'
import GoogleAuthButton from '../../googleAuthButton/GoogleAuthButton'
import apple from '../../assets/socialsLogo/apple.png'
import fb from '../../assets/socialsLogo/facebook.svg'
const { Title, Text } = Typography

const Register = () => {
  const navigate = useNavigate()
  const [registerAsBusiness, { isLoading: registerLoading }] = useRegisterAsBusinessMutation()
  const onFinish = async (values) => {
    const registerData = {
      email: values.email,
      password: values.password
    }
    try {
      await registerAsBusiness({ data: registerData })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            console.log(res)
            toast.success(res?.message);
            navigate('/business/otp', {
              state: { email: registerData.email },
            })
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
          <Title level={4} className="mb-1">
            Get Started
          </Title>
          <h1 className="text-[var(--body-text)] text-start">
            Please use your company email address to create an account
          </h1>
        </div>


        <FormWrapper onFinish={onFinish}>
          <InputField
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Only company email is required!' },
              { type: 'email', message: 'Enter a valid email address!' },
            ]}
            placeholder="john.doe@example.com"
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
            rules={[
              { required: true, message: 'Password is required!' },
              { type: 'password', message: 'Enter a valid password!' },
            ]}
            placeholder="Enter your password"
            type="password"
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          />

          <Button
            loading={registerLoading}
            disabled={registerLoading}
            size='large'
            shape='round'
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10 }}
          >
            Continue with Email
          </Button>
        </FormWrapper>
        <Divider>Or sign up with</Divider>
        <div className="grid grid-cols-1 gap-2 space-x-4">
          <GoogleAuthButton role={"bussinessOwner"} />
          {/* <div>
            <div className="flex items-center justify-between gap-1 text-sm py-2 rounded-md cursor-pointer">
              <div className="border hover:bg-[#F0F5FE] flex px-3 py-2 rounded-4xl w-full border-gray-200 items-center justify-center gap-1">
                <img src={apple} alt="" className="w-5 h-5" />{" "}
                <span className="text-gray-600">Continue with Apple</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1   text-sm py-2 rounded-md cursor-pointer">
              <div className="border hover:bg-[#F0F5FE] flex px-3 py-2 rounded-4xl w-full border-gray-200 items-center justify-center gap-1">
                <img src={fb} alt="" className="w-5 h-5" />{" "}
                <span className="text-gray-600">Continue with Facebook</span>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="mt-4 text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:underline transtion-all"
          >
            Login
          </Link>
        </div>
        <div className="mt-4 text-gray-500">
          <Link to="/help" className="mr-3 hover:underline transtion-all">
            Help
          </Link>
          <Link to="/privacy" className="mr-3 hover:underline transtion-all">
            Privacy
          </Link>
          <Link to="/terms" className="mr-3 hover:underline transtion-all">
            Terms
          </Link>
        </div> */}

        {/* <div className="mt-4">
          <h1 className="text-[var(--body-text)] font-extralight text-sm">
            By joining Sampli, you agree to our
            <Link>
              <span className="underline hover:text-blue-400 transion-all text-[#111]">
                Terms of Service
              </span>
            </Link>
            ,
            <Link>
              <span className="underline hover:text-blue-400 transion-all text-[#111]">
                Privacy Policy
              </span>
            </Link>{" "}
            and{" "}
            <Link>
              <span className="underline hover:text-blue-400 transion-all text-[#111]">
                Cookie Policy.
              </span>
            </Link>
          </h1>
        </div> */}
      </div>
    </div>
  )
}

export default Register
