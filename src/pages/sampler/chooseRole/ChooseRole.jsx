import React, { useState } from 'react'
import { Typography, Radio, Card, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../components/ui/Logo'

const { Title, Text } = Typography

const ChooseRole = () => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const [selectedOption, setSelectedOption] = useState('')
  const router = useNavigate()
  const handleNext = () => {
    if (selectedOption === 'existing') {
      return router('/signup/reviewer')
    } else if (selectedOption === 'new') {
      return router('/signup/business')
    }
  }

  return (
    <div className="flex justify-center items-center  min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl ">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex flex-col mb-6 items-start  ">
          <Title level={2}>Get Started</Title>
          <h1 className="text-[var(--body-text)] leading-1  text-start">
            Are you here to review products or to get your products reviewed?
          </h1>
        </div>

        <Radio.Group
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ width: '100%' }}
          
        >
          <Card
            onClick={() => setSelectedOption('existing')}
            style={{
              marginBottom: 12,
              border:
                selectedOption === 'existing'
                  ? '1px solid #1890ff'
                  : '1px solid #ddd',
            }}
          >
            <Radio value="existing" style={{ width: '100%' }}>
              <Title level={5}>Become a Product Reviewer</Title>
              <Text type="secondary">
                As a product reviewer, you'll get paid to test and provide
                feedback on a variety of products.
              </Text>
            </Radio>
          </Card>

          <Card
            onClick={() => setSelectedOption('new')}
            style={{
              marginBottom: 12,
              border:
                selectedOption === 'new'
                  ? '1px solid #1890ff'
                  : '1px solid #ddd',
            }}
          >
            <Radio value="new" style={{ width: '100%' }}>
              <Title level={5} style={{ margin: 0 }}>
                Get Your Products Reviewed
              </Title>
              <Text type="secondary">
                If you're a business owner looking to increase views and sales,
                our community of passionate reviewers can help.
              </Text>
            </Radio>
          </Card>
        </Radio.Group>

        <Button
          type="primary"
          onClick={handleNext}
          disabled={selectedOption === ''} 
          className="btn-primary w-full cursor-pointer mt-6 px-4 py-2 bg-[var(--baseColor)] hover:bg-blue-600 text-center transition-all duration-150"
        >
          Continue
        </Button>

        <div className="mt-4 text-gray-500 text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:underline transition-all"
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

export default ChooseRole
