import apiClient from './apiClient';

export const getAssessments = (params = {}) => {
  return apiClient.get('/assessments', { params });
};

export const getProfileByPatientNumber = (patientNumber) => {
  return apiClient.get(`/profiles/${patientNumber}`);
};

export const createAssessment = (assessmentData) => {
  return apiClient.post('/assessments', assessmentData);
};
