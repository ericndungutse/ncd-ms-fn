import apiClient from './apiClient';

export const createDiagnosis = (diagnosisData) => {
  return apiClient.post('/diagnoses', diagnosisData);
};

export const getDiagnosisByPatientNumber = (patientNumber) => {
  return apiClient.get(`/diagnoses/${patientNumber}`);
};
