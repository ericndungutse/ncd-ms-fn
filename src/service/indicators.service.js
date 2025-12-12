import apiClient from './apiClient';

export const getIndicators = (params = {}) => {
  return apiClient.get('/indicators', { params });
};
