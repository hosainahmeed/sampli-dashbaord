import React, { useState, useRef, useEffect } from 'react'
import { Typography, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../components/ui/Logo'

const { Title, Text } = Typography

const SignUpOtp = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(30)
  const inputsRef = useRef([])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    let newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 4) {
      inputsRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus()
    }
  }

  const handleResend = () => {
    setOtp(['', '', '', '', ''])
    setTimeLeft(30)
  }

  const handleContinue = () => {
    console.log('OTP:', otp.join(''))
    navigate('/sign-up-more-info')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 gradient-container">
      <div className="gradient-ellipse"></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex items-start flex-col text-start">
          <Title level={2} className="mb-2">
            Verify email
          </Title>
          <h1 className="text-base text-[14px] text-justify text-gray-500">
            <div>
              Just one last step, we sent an otp to
              <strong className="text-[#111]"> micheal@gmail.com</strong> please
              input the OTP below
            </div>
          </h1>
        </div>

        <div className="flex justify-center gap-2 my-4">
          {otp.map((value, index) => (
            <Input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="text-center text-xl w-8 h-12 border-2 border-blue-400"
            />
          ))}
        </div>

        <Button
          type="primary"
          className="w-full"
          disabled={otp.includes('')}
          onClick={handleContinue}
        >
          Continue
        </Button>

        <div className="mt-3">
          {timeLeft > 0 ? (
            <Text>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</Text>
          ) : (
            <h1
              className="text-blue-500 cursor-pointer text-[14px] hover:text-blue-800"
              onClick={handleResend}
            >
              Resend OTP
            </h1>
          )}
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

export default SignUpOtp
