import apiClient from './apiClient';

export const getUsers = (params = {}) => {
  return apiClient.get('/users', { params });
};

export const registerUser = (userData) => {
  return apiClient.post('/users/register', userData);
};
