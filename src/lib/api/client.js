import axios from 'axios';
import { API_BASE_URLS } from '../../config/constants';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const primaryClient = axios.create({
  baseURL: API_BASE_URLS.PRIMARY,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const secondaryClient = axios.create({
  baseURL: API_BASE_URLS.SECONDARY,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const requestInterceptor = (config) => {
  return config;
};

const responseInterceptor = (response) => response.data;

const errorInterceptor = (error) => {
  if (error.response) {
    throw new ApiError(
      error.response.data?.message || error.message,
      error.response.status
    );
  } else if (error.request) {
    throw new ApiError('No response from server', 0);
  } else {
    throw new ApiError(error.message || 'Network error occurred', 0);
  }
};

[primaryClient, secondaryClient].forEach(client => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(responseInterceptor, errorInterceptor);
});

export const apiClient = {
  primary: primaryClient,
  secondary: secondaryClient,
};
