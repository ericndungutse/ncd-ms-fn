import apiClient from './apiClient';

export const getUsers = (params = {}) => {
  return apiClient.get('/users', { params });
};
