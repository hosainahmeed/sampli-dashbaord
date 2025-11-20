import { GetCity, GetCountries, GetState } from "react-country-state-city";


export const getCountry = async () => {
  try {
    const result = await GetCountries();
    return result || [];
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

export const getState = async (countryId) => {
  try {
    const result = await GetState(parseInt(countryId));
    return result || [];
  } catch (error) {
    console.error('Error fetching states:', error);
    throw new Error('Failed to fetch states');
  }
};

export const getCity = async (countryId, stateId) => {
  try {
    const result = await GetCity(parseInt(countryId), stateId);
    return result || [];
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw new Error('Failed to fetch cities');
  }
};