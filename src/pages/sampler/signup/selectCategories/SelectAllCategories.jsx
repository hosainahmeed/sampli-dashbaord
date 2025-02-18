import React, { useState } from 'react'
import {
  Steps,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Upload,
  message,
} from 'antd'
import { Country } from 'country-state-city'
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai'
import { FaTiktok } from 'react-icons/fa'
import image1 from '/public/randomImage/118.png'
import image2 from '/public/randomImage/120.png'
import image3 from '/public/randomImage/121.png'
import image4 from '/public/randomImage/123.png'
import image5 from '/public/randomImage/125.png'

const images = [image1, image2, image3, image4, image5]

const { Step } = Steps
const { Option } = Select

const SelectAllCategories = () => {
  const [formData, setFormData] = useState({
    categories: [],
    products: [],
    reviewPlatforms: [],
    contactInfo: {},
    socialInfo: {},
    profileDetails: {},
  })
  const [current, setCurrent] = useState(0)
  const [fileList, setFileList] = useState([])

  const next = () => setCurrent((prev) => prev + 1)
  const prev = () => setCurrent((prev) => prev - 1)

  const handleCheckboxChange = (field, value, checked) => {
    setFormData((prev) => {
      const updatedField = checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value)
      return { ...prev, [field]: updatedField }
    })
  }

  const handleFormSubmit = (values) => {
    setFormData((prev) => ({ ...prev, contactInfo: values }))
    console.log('Final Form Data:', { ...formData, contactInfo: values })
  }

  const beforeUpload = (file) => {
    const isLt500KB = file.size / 1024 < 500
    if (!isLt500KB) {
      message.error('Avatar image must be under 500KB')
    }
    return isLt500KB
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const steps = [
    // Step 1 All Categories
    {
      title: 'All Categories',
      content: (
        <div>
          <p className="pb-5 text-2xl  text-center font-semibold">
            Select all categories that apply
          </p>
          <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            className="p-6 "
            requiredMark={false}
          >
            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="Ethnicity"
                name="ethnicity"
                rules={[
                  { required: true, message: 'Please select your ethnicity' },
                ]}
                className="w-full"
              >
                <Select placeholder="Select">
                  <Option value="White/Caucasian">White/Caucasian</Option>
                  <Option value="Black/African American">
                    Black/African American
                  </Option>
                  <Option value="Asian">Asian</Option>
                  <Option value="Native Hawaiian or Pacific Islander">
                    Native Hawaiian or Pacific Islander
                  </Option>
                  <Option value="Hispanic or Latino">Hispanic or Latino</Option>
                  <Option value="Native American">Native American</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Highest Level of Education"
                name="education"
                rules={[
                  {
                    required: true,
                    message: 'Please select your highest level of education',
                  },
                ]}
                className="w-full"
              >
                <Select placeholder="Select">
                  <Option value="High School">High School</Option>
                  <Option value="Associate Degree">Associate Degree</Option>
                  <Option value="Bachelor's Degree">
                    Bachelor&apos;s Degree
                  </Option>
                  <Option value="Master's Degree">Master&apos;s Degree</Option>
                  <Option value="Doctorate">Doctorate</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                name="maritalStatus"
                label="Marital Status"
                rules={[
                  {
                    required: true,
                    message: 'Please select your marital status',
                  },
                ]}
                className="w-full"
              >
                <Select placeholder="Select">
                  <Option value="Single">Single</Option>
                  <Option value="Married">Married</Option>
                  <Option value="Widowed">Widowed</Option>
                  <Option value="Widowed">Separated</Option>
                  <Option value="Divorced">Divorced</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="employmentStatus"
                label="Employment Status"
                rules={[
                  {
                    required: true,
                    message: 'Please select your employment status',
                  },
                ]}
                className="w-full"
              >
                <Select placeholder="Select">
                  <Option value="Employed">Employed</Option>
                  <Option value="Unemployed">Unemployed</Option>
                  <Option value="Student">Student</Option>
                  <Option value="Retired">Retired</Option>
                  <Option value="Disabled">Disabled</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                name="annualIncome"
                label="Annual Household Income"
                rules={[
                  {
                    required: true,
                    message: 'Please select your annual household income',
                  },
                ]}
                className="w-full"
              >
                <Select placeholder="Select">
                  <Option value="Below $25,000">Below $25,000</Option>
                  <Option value="$25,000 - $50,000">$25,000 - $50,000</Option>
                  <Option value="$50,001 - $75,000">$50,001 - $75,000</Option>
                  <Option value="$75,001 - $100,000">$75,001 - $100,000</Option>
                  <Option value="Above $100,000">Above $100,000</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="familyAndDependents"
                label="Family and Dependents"
                rules={[
                  {
                    required: true,
                    message: 'Please select your family and dependents',
                  },
                ]}
                className="w-full"
              >
                <Select placeholder="Select">
                  <Option value="None">None</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4+">4+</Option>
                </Select>
              </Form.Item>
            </div>
          </Form>
        </div>
      ),
    },

    // Step 2 Products Interest
    {
      title: 'Products Interest',
      content: (
        <div className="">
          <p className="pb-5 text-2xl  text-center font-semibold">
            What products interest you?
          </p>
          <div className="grid grid-cols-2 gap-4 ">
            {[
              'Tech & Electronics',
              'Home & Kitchen',
              'Fashion & Accessories',
              'Food & Beverages',
              'Beauty & Cosmetics',
              'Sports & Fitness',
            ].map((item) => (
              <div
                key={item}
                className=" p-5 border border-gray-100 cursor-pointer"
              >
                <Checkbox
                  value={item}
                  onChange={(e) =>
                    handleCheckboxChange(
                      'products',
                      e.target.checked
                        ? [...formData.products, item]
                        : formData.products.filter((p) => p !== item)
                    )
                  }
                />
                <span className="ml-2 ">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // Step 3 Review Platforms
    {
      title: 'Review Platforms',
      content: (
        <div className="">
          <p className="pb-4 text-2xl text-center font-semibold">
            Where do you currently share reviews?
          </p>
          <div className="grid grid-cols-2 gap-4">
            {['Youtube', 'TikTok', 'Instagram', 'Blog', 'WhatsApp'].map(
              (platform) => (
                <div
                  key={platform}
                  className="p-5 border border-gray-100 cursor-pointer"
                >
                  <Checkbox
                    value={platform}
                    onChange={(e) =>
                      handleCheckboxChange(
                        'reviewPlatforms',
                        e.target.checked
                          ? [...formData.reviewPlatforms, platform]
                          : formData.reviewPlatforms.filter(
                              (p) => p !== platform
                            )
                      )
                    }
                  />
                  <span className="ml-2">{platform}</span>
                </div>
              )
            )}
          </div>
        </div>
      ),
    },

    // Step 4 Contact & Shipping Information
    {
      title: 'Information',
      content: (
        <div>
          <p className="pb-5 text-2xl text-center font-semibold">
            Contact & Shipping Information
          </p>

          <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            className="p-6"
            requiredMark={false}
          >
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter your address' }]}
              className="w-full"
            >
              <Input placeholder="Enter your address" />
            </Form.Item>
            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: 'Please select your country' },
                ]}
                className="w-full"
              >
                <Select
                  showSearch
                  placeholder="Select your country"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().includes(input.toLowerCase())
                  }
                  options={Country.getAllCountries().map((c) => ({
                    value: c.isoCode,
                    label: c.name,
                  }))}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your ZIP/Postal code',
                  },
                ]}
                className="w-full"
              >
                <Input placeholder="Enter your ZIP/Postal code" />
              </Form.Item>
            </div>

            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please select your city' }]}
                className="w-full"
              >
                <Input placeholder="Enter your city" />
              </Form.Item>
              <Form.Item
                label="State"
                name="state"
                rules={[
                  { required: true, message: 'Please select your state' },
                ]}
                className="w-full"
              >
                <Input placeholder="Enter your state" />
              </Form.Item>
            </div>

            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="Phone number"
                name="phone"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                ]}
                className="w-full"
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
              <Form.Item
                label="Alternate Phone number"
                name="altPhone"
                className="w-full"
              >
                <Input placeholder="Enter your alternate phone number" />
              </Form.Item>
            </div>
          </Form>
        </div>
      ),
    },

    // Step 5  Add your socials
    {
      title: 'Add Your Socials',
      content: (
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
          className="p-6"
          requiredMark={false}
        >
          <p className="pb-5 text-2xl text-center font-bold">
            Add your socials
          </p>
          <div className="flex flex-col space-y-4">
            <Form.Item name="instagram" className="w-full">
              <div className="flex items-center space-x-3">
                <AiFillInstagram size={24} className="text-pink-600" />
                <Input placeholder="Instagram username" />
              </div>
            </Form.Item>
            <Form.Item name="twitter" className="w-full">
              <div className="flex items-center space-x-3">
                <AiFillTwitterCircle size={24} className="text-blue-400" />
                <Input placeholder="Twitter username" />
              </div>
            </Form.Item>
            <Form.Item name="youtube" className="w-full">
              <div className="flex items-center space-x-3">
                <AiFillYoutube size={24} className="text-red-600" />
                <Input placeholder="YouTube Channel" />
              </div>
            </Form.Item>
            <Form.Item name="tiktok" className="w-full">
              <div className="flex items-center space-x-3">
                <FaTiktok size={24} className="text-black" />
                <Input placeholder="TikTok Username" />
              </div>
            </Form.Item>
          </div>
        </Form>
      ),
    },

    //Step 6  Add profile details

    {
      title: 'Add Profile Details',
      content: (
        <Form layout="vertical" className="p-6" requiredMark={false}>
          <p className="pb-5 text-2xl text-center font-semibold">
            Add profile details
          </p>
          <div className="flex justify-center items-center gap-2">
            <div className="flex justify-center space-x-3">
              {images.map((imgSrc, index) => (
                <div
                  key={index}
                  className="w-24 h-24 rounded-full overflow-hidden border border-gray-300"
                >
                  <img
                    src={imgSrc}
                    alt={`Avatar ${index + 1}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ))}
            </div>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-circle"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={beforeUpload}
              className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 object-center object-contain flex items-center justify-center"
            >
              {fileList.length < 1 && 'Upload'}
            </Upload>
          </div>
          <p className="text-center text-red-500 mt-2">
            Avatar image must be under 500kb
          </p>
          <Form.Item
            name="bio"
            label="Add a bio"
            rules={[{ required: true, message: 'Please enter your bio' }]}
          >
            <Input.TextArea
              maxLength={120}
              placeholder="Write about yourself..."
            />
          </Form.Item>
        </Form>
      ),
    },
  ]
  // const isNextEnabled = () => {
  //   if (current === 0) return formData.products.length > 0
  //   if (current === 1) return formData.reviewPlatforms.length > 0
  //   if (current === 2) return formData.avatar !== null
  //   return true
  // }

  return (
    <div className="responsive-width flex items-center justify-center h-screen">
      <div className="p-6 border border-gray-200 h-[70vh] rounded-lg w-full flex flex-col">
        <Steps current={current} className="mb-6">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
        <div className="flex-grow mt-14 px-10">
          <div
            className="text-end text-blue-600 -mb-6 cursor-pointer hover:text-blue-400"
            onClick={next}
          >
            Skip
          </div>
          {steps[current].content}
        </div>
        <div className="flex justify-between mt-5">
          {current > 0 && <Button onClick={prev}>Back</Button>}
          {current < steps.length - 1 ? (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => console.log('Final Data:', formData)}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectAllCategories
