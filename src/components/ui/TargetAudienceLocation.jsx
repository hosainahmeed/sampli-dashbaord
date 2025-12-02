import React, { useState, useEffect } from 'react';
import {
  Card,
  Select,
  Alert,
  Typography,
  Space,
  Tag,
} from 'antd';
import { getCountry, getState, getCity } from '../../lib/getDataFromCountryApis';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignData } from '../../Redux/slices/CampaingSlice';

const { Title, Text } = Typography;
const { Option } = Select;


function TargetAudienceLocation() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [loading, setLoading] = useState({
    countries: false,
    states: false,
    cities: false
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const campaignData = useSelector((state) => state.campaign);

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(prev => ({ ...prev, countries: true }));
      setError('');
      try {
        const countryData = await getCountry();
        if (countryData) {
          const usCountry = countryData.find((country) =>
            country.name.toLowerCase().includes('united states') ||
            country.name.toLowerCase().includes('usa') ||
            country.name.toLowerCase().includes('u.s.a')
          );
          if (usCountry) {
            setCountries([usCountry]);
            const countryId = usCountry.id.toString();
            setSelectedCountry(countryId);
            dispatch(setCampaignData({
              country: usCountry.name
            }));
          } else {
            setError('United States not found in country list');
          }
        }
      } catch (error) {
        console.error('Failed to load countries:', error);
        setError('Failed to load countries');
      } finally {
        setLoading(prev => ({ ...prev, countries: false }));
      }
    };

    loadCountries();
  }, [dispatch]);


  useEffect(() => {
    const loadStates = async () => {
      if (!selectedCountry) return;

      setLoading(prev => ({ ...prev, states: true }));
      setError('');
      setStates([]);
      setCities([]);
      setSelectedStates([]);
      setSelectedCities([]);

      try {
        const stateData = await getState(selectedCountry);
        if (stateData) {
          setStates(stateData);
        }
      } catch (error) {
        console.error('Failed to load states:', error);
        setError('Failed to load states');
      } finally {
        setLoading(prev => ({ ...prev, states: false }));
      }
    };

    loadStates();
  }, [selectedCountry]);

  useEffect(() => {
    const loadCitiesForStates = async () => {
      if (selectedStates.length === 0) {
        setCities([]);
        setSelectedCities([]);
        return;
      }

      setLoading(prev => ({ ...prev, cities: true }));
      setError('');

      try {
        const citiesPromises = selectedStates.map(stateId =>
          getCity(selectedCountry, stateId)
        );

        const citiesResults = await Promise.all(citiesPromises);
        const allCities = citiesResults.flat().filter(Boolean);

        const uniqueCities = allCities.filter((city, index, self) =>
          index === self.findIndex(c => c.id === city.id)
        );

        setCities(uniqueCities);
      } catch (error) {
        setError('Failed to load cities for selected states');
      } finally {
        setLoading(prev => ({ ...prev, cities: false }));
      }
    };

    loadCitiesForStates();
  }, [selectedCountry, selectedStates]);

  const handleStateChange = (stateIds) => {
    setSelectedStates(stateIds);
    const stateNames = states
      .filter(state => stateIds.includes(state.id))
      .map(state => state?.state_code);

    dispatch(setCampaignData({
      state: stateNames,
      city: []
    }));
  };

  const handleCityChange = (cityIds) => {
    setSelectedCities(cityIds);
    const cityNames = cities
      .filter(city => cityIds.includes(city.id))
      .map(city => city.name);

    dispatch(setCampaignData({
      city: cityNames
    }));
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
      <Card
        title={
          <Space>
            <Title level={4} style={{ margin: 0 }}>Location Selection</Title>
            <Text type="secondary">United States Only</Text>
          </Space>
        }
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {error && (
            <Alert message={error} type="error" showIcon closable />
          )}

          <div>
            <Text strong>Country</Text>
            <Select
              value={selectedCountry}
              style={{ width: '100%', marginTop: 8 }}
              disabled
              loading={loading.countries}
            >
              {countries.map(country => (
                <Option key={country.id} value={country.id.toString()}>
                  {country.name}
                </Option>
              ))}
            </Select>
            <Text type="secondary" style={{ fontSize: '12px', marginTop: 4, display: 'block' }}>
              Only United States is available for selection
            </Text>
          </div>
          <div>
            <Text strong><span className='text-red-500'>*</span>States</Text>
            <Select
              mode="multiple"
              style={{ width: '100%', marginTop: 8 }}
              placeholder={loading.states ? "Loading states..." : "Select states"}
              value={selectedStates}
              onChange={handleStateChange}
              loading={loading.states}
              showSearch
              filterOption={filterOption}
              allowClear
            >
              {states.map(state => (
                <Option key={state.id} value={state.id}>
                  {state.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Text strong>Cities</Text>
            <Select
              mode="multiple"
              style={{ width: '100%', marginTop: 8 }}
              placeholder={
                selectedStates.length === 0
                  ? "Please select states first"
                  : loading.cities
                    ? "Loading cities..."
                    : "Select cities"
              }
              value={selectedCities}
              onChange={handleCityChange}
              loading={loading.cities}
              disabled={selectedStates.length === 0 || loading.cities}
              showSearch
              filterOption={filterOption}
              allowClear
            >
              {cities.map(city => (
                <Option key={city.id} value={city.id}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default TargetAudienceLocation