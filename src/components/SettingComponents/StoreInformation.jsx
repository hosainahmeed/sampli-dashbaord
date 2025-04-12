/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import axios from "axios";
import AsyncSelect from "react-select/async";

const { Option } = Select;

const StoreInformation = () => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your API key

  // Fetch countries dynamically
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const countryData = res.data.map((country) => ({
          label: country.name.common,
          value: country.cca2,
        }));
        setCountries(countryData);
      })
      .catch((err) => console.error("Error fetching countries", err));
  }, []);

  // Fetch states dynamically based on selected country
  const fetchStates = async (countryCode) => {
    try {
      const res = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        {
          headers: { "X-CSCAPI-KEY": "YOUR_CSCAPI_KEY" }, // Replace with your API key
        }
      );
      return res.data.map((state) => ({
        label: state.name,
        value: state.iso2,
      }));
    } catch (err) {
      console.error("Error fetching states", err);
      return [];
    }
  };

  // Fetch cities dynamically based on selected state
  const fetchCities = async (inputValue) => {
    if (!selectedCountry || !selectedState) return [];
    try {
      const res = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`,
        {
          headers: { "X-CSCAPI-KEY": "YOUR_CSCAPI_KEY" },
        }
      );
      return res.data
        .filter((city) =>
          city.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((city) => ({
          label: city.name,
          value: city.name,
        }));
    } catch (err) {
      console.error("Error fetching cities", err);
      return [];
    }
  };

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Legal Business Name" name="businessName">
            <Input placeholder="Enter Business Name" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Address" name="address">
            <Input placeholder="Enter Address" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Country" name="country">
            <Select
              placeholder="Select Country"
              options={countries}
              onChange={async (value) => {
                setSelectedCountry(value);
                const statesData = await fetchStates(value);
                setStates(statesData);
                setCities([]); // Reset cities when changing country
              }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="ZIP/Postal Code" name="zip">
            <Input placeholder="Enter ZIP Code" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="State" name="state">
            <Select
              placeholder="Select State"
              options={states}
              onChange={(value) => {
                setSelectedState(value);
                setCities([]); // Reset cities when changing state
              }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="City" name="city">
            <AsyncSelect
              cacheOptions
              loadOptions={fetchCities}
              defaultOptions
              placeholder="Select City"
            />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
};

export default StoreInformation;
