import apiClient from './apiClient';

export const createDiagnosis = (diagnosisData) => {
  return apiClient.post('/diagnoses', diagnosisData);
};
