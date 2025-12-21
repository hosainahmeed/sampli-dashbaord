import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { State, City } from "country-state-city";
import { useCreateBusinessStoreMutation } from "../../../Redux/businessApis/business_store/businessStoreApis";
import toast from "react-hot-toast";

const { Option } = Select;
const US_COUNTRY_CODE = 'US';

const CompanyInfoForm = () => {
    const [form] = Form.useForm();
    const [usStates, setUsStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [createBusinessStore, { isLoading: isCreateBusinessStoreLoading }] = useCreateBusinessStoreMutation();

    useEffect(() => {
        // Load US states on component mount
        const usStatesList = State.getStatesOfCountry(US_COUNTRY_CODE);
        setUsStates(usStatesList);

        // Set default country to US
        form.setFieldsValue({ country: US_COUNTRY_CODE });
    }, [form]);

    const handleStateChange = (stateCode) => {
        const selectedCities = City.getCitiesOfState(US_COUNTRY_CODE, stateCode);
        setCities(selectedCities);
        form.setFieldsValue({ city: undefined });
    };

    const handleSubmit = async (values) => {
        try {
            const res = await createBusinessStore(values).unwrap()
            if (!res?.success) {
                throw new Error(res?.message || "Something went wrong!")
            }
            toast.dismiss()
            toast.success(res?.message || "Business store created successfully!")
            form.resetFields();
        } catch (error) {
            toast.dismiss()
            toast.error(error?.data?.message || error?.message || "Something went wrong!")
        }
    };

    return (
        <div className="mx-auto bg-white rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6">Company Information</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={true}

            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            name="name"
                            label="Store Name"
                            rules={[{ required: true, message: 'Please enter store name' }]}
                            className="w-full"
                        >
                            <Input size="large" placeholder="Enter store name" className="w-full" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            name="company"
                            label="Company"
                            rules={[{ required: true, message: 'Please enter company name' }]}
                            className="w-full"
                        >
                            <Input size="large" placeholder="Enter company name" className="w-full" />
                        </Form.Item>
                    </Col>
                </Row>



                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item
                            name="country"
                            label="Country"
                            rules={[{ required: true }]}
                            className="w-full"
                        >
                            <Select
                                disabled
                                value={US_COUNTRY_CODE}
                                className="w-full"
                            >
                                <Option value={US_COUNTRY_CODE}>United States (US)</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item
                            name="state"
                            label="State"
                            rules={[{ required: true, message: 'Please select a state' }]}
                            className="w-full"
                        >
                            <Select
                                placeholder="Select State"
                                onChange={handleStateChange}
                                showSearch
                                optionFilterProp="children"
                                className="w-full"
                                filterOption={(input, option) => {
                                    const name = option?.children?.toString().toLowerCase() || "";
                                    const code = option?.value?.toString().toLowerCase() || "";
                                    const search = input.toLowerCase();
                                    return name.includes(search) || code.includes(search);
                                }}
                            >
                                {usStates.map((state) => (
                                    <Option key={state.isoCode} value={state.isoCode}>
                                        {`${state.name} (${state.isoCode})`}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item
                            name="city"
                            label="City"
                            // rules={[{ required: true, message: 'Please select a city' }]}
                            className="w-full"
                        >
                            <Select
                                placeholder="Select City"
                                showSearch
                                optionFilterProp="children"
                                className="w-full"
                                filterOption={(input, option) =>
                                    (option?.children ?? "").toString().toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {cities.map((city) => (
                                    <Option key={city.name} value={city.name}>
                                        {city.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Form.Item
                            name="street1"
                            label="Street"
                            rules={[{ required: true, message: 'Please enter street address' }]}
                            className="w-full"
                        >
                            <Input size="large" placeholder="Enter street address" className="w-full" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Form.Item
                            name="zip"
                            label="ZIP"
                            rules={[{ required: true, type: "number", message: "Please enter a valid ZIP" }]}
                            className="w-full"
                        >
                            <Input type="number" size="large" placeholder="Enter ZIP" className="w-full" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true, type: 'number', message: 'Please enter a valid phone number' }]}
                            className="w-full"
                        >
                            <Input
                                type="number"
                                size="large"
                                placeholder="Enter phone number"
                                className="w-full"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                            className="w-full"
                        >
                            <Input size="large" placeholder="Enter email address" className="w-full" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item name="tagline" label="Tagline" className="w-full">
                            <Input size="large" placeholder="Enter your tagline" className="w-full" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item name="description" label="Description" className="w-full">
                            <Input.TextArea
                                rows={4}
                                placeholder="Enter description"
                                className="w-full"
                                style={{ minHeight: '120px' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-end mt-6">
                    <Button
                        loading={isCreateBusinessStoreLoading}
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="w-full sm:w-auto px-8"
                    >
                        Save Company Info
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CompanyInfoForm;
