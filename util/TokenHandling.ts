import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

// Function to save the token securely
export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync('jwtToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Function to retrieve the token securely
export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync('jwtToken');
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Function to remove the token securely
export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync('jwtToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
};