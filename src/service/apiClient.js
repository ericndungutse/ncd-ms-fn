// src/services/apiClient.js
import axios from 'axios';

import { queryClient } from '../main.jsx';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: attach token automatically
apiClient.interceptors.request.use((config) => {
  const { token } = queryClient.getQueryData(['user']) || {};
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 responses globally
apiClient.interceptors.response.use(
  (response) => response, // return response if successful
  (error) => {
    if (error.response?.status === 401) {
      // Optional: clear user data
      queryClient.clear();
      // Optional: redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
