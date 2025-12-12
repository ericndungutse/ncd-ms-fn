import apiClient from './apiClient';

export const getAssessments = (params = {}) => {
  return apiClient.get('/assessments', { params });
};
