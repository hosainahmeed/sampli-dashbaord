import React from 'react'
import { Form, Input, Button } from 'antd'
import {
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa'

const ContactUs = () => {
  const submitForm = (values) => {
    console.log('Form submitted', values)
  }

  return (
    <div className="responsive-width h-screen !mt-5">
      <div className="text-2xl font-bold mb-5">Contact Us</div>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start ">
        <div className="w-full md:w-1/2 ">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Get in touch
          </h2>
          <div className="space-y-3">
            <p className="flex items-center text-gray-700">
              <MailOutlined className="mr-2 text-blue-500" /> Info@sampli.com
            </p>
            <p className="flex items-center text-gray-700">
              <PhoneOutlined className="mr-2 text-blue-500" /> 08101070977
            </p>
            <p className="flex items-center text-gray-700">
              <WhatsAppOutlined className="mr-2 text-green-500" /> 08101070977
            </p>
          </div>
          <h3 className="!mt-10 !mb-5 font-semibold text-lg  text-gray-700">
            Follow us
          </h3>
          <div className="flex items-center  pb-5 text-[#BBC9C8] gap-7  text-2xl transition-all ">
            <FaFacebook className="hover:text-blue-600 cursor-pointer transition-all" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all" />
            <FaLinkedin className="hover:text-blue-700 cursor-pointer transition-all" />
            <FaTiktok className="hover:text-black cursor-pointer transition-all" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer transition-all" />
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 border border-gray-200 p-6 rounded-lg">
          <Form layout="vertical" onFinish={submitForm} requiredMark={true}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: 'Please enter your subject' }]}
            >
              <Input placeholder="Enter subject" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter your message" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="w-full bg-blue-500"
                htmlType="submit"
              >
                Submit Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
