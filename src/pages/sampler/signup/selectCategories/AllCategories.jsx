import { Form, Select } from 'antd'
import React from 'react'

const { Option } = Select
const AllCategories = () => {
 
  return (
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
              <Option value="Bachelor's Degree">Bachelor&apos;s Degree</Option>
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
  )
}

export default AllCategories
