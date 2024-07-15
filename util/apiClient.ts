import axios, { AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from './TokenHandling';

export const apiClient = axios.create({
  baseURL: 'https://edumind-3587039ec3f2.herokuapp.com/v1'
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await getToken();
    if (token) {
      // Ensure config.headers is of type AxiosHeaders
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;