import React, { useState } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { Country, State, City } from "country-state-city";
import { useCreateBusinessStoreMutation } from "../../../Redux/businessApis/business_store/businessStoreApis";
import toast from "react-hot-toast";

const { Option } = Select;

const CompanyInfoForm = () => {
    const [form] = Form.useForm();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [createBusinessStore, { isLoading: isCreateBusinessStoreLoading }] = useCreateBusinessStoreMutation();

    const countries = Country.getAllCountries();

    const handleCountryChange = (countryCode) => {
        const selectedStates = State.getStatesOfCountry(countryCode);
        setStates(selectedStates);
        setCities([]);
        form.setFieldsValue({ state: undefined, city: undefined });
    };

    const handleStateChange = (stateCode) => {
        const countryCode = form.getFieldValue("country");
        const selectedCities = City.getCitiesOfState(countryCode, stateCode);
        setCities(selectedCities);
        form.setFieldsValue({ city: undefined });
    };

    const handleSubmit = async (values) => {
        try {
            await createBusinessStore(values).unwrap().then((res) => {
                if (res?.success) {
                    toast.dismiss()
                    toast.success(res?.message || "Business store created successfully!")
                    form.resetFields();
                }
            })
        } catch (error) {
            toast.dismiss()
            toast.error(error?.data?.message || error?.message || "Something went wrong!")
        }
    };

    return (
        <div className="mx-auto p-6 bg-white rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-6">Company Information</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={true}

            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="name" label="Store Name" rules={[{ required: true }]}>
                            <Input placeholder="Enter store name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="company" label="Company" rules={[{ required: true }]}>
                            <Input placeholder="Enter company name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="street1" label="Street 1" rules={[{ required: true }]}>
                            <Input placeholder="Enter street address" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="street2" label="Street 2">
                            <Input placeholder="Enter suite/apt/etc." />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select Country"
                                onChange={handleCountryChange}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => {
                                    const name = option?.children?.toString().toLowerCase() || "";
                                    const code = option?.value?.toString().toLowerCase() || "";
                                    const search = input.toLowerCase();
                                    return name.includes(search) || code.includes(search);
                                }}
                            >
                                {countries.map((c) => (
                                    <Option key={c.isoCode} value={c.isoCode}>
                                        {`${c.name} (${c.isoCode})`}
                                    </Option>
                                ))}
                            </Select>


                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="state" label="State" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select State"
                                onChange={handleStateChange}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => {
                                    const name = option?.children?.toString().toLowerCase() || "";
                                    const code = option?.value?.toString().toLowerCase() || "";
                                    const search = input.toLowerCase();
                                    return name.includes(search) || code.includes(search);
                                }}
                            >
                                {states.map((s) => (
                                    <Option key={s.isoCode} value={s.isoCode}>
                                        {`${s.name} (${s.isoCode})`}
                                    </Option>
                                ))}
                            </Select>


                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="city" label="City" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select City"
                                showSearch
                                optionFilterProp="children"
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

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="zip" label="ZIP" rules={[{ required: true }]}>
                            <Input placeholder="Enter ZIP" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                            <Input placeholder="Enter phone number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="alternativePhoneNumber"
                            label="Alternative Phone"
                        >
                            <Input placeholder="Enter alternative phone number" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input placeholder="Enter email address" />
                </Form.Item>

                <Form.Item name="tagline" label="Tagline">
                    <Input placeholder="Enter your tagline" />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input.TextArea rows={4} placeholder="Enter description" />
                </Form.Item>

                <div className="flex justify-end">
                    <Button loading={isCreateBusinessStoreLoading} type="primary" htmlType="submit">
                        Save Company Info
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CompanyInfoForm;
