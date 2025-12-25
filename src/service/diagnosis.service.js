import apiClient from './apiClient';

export const createDiagnosis = (diagnosisData) => {
  return apiClient.post('/screenings', diagnosisData);
};

export const getDiagnosisByPatientNumber = (patientNumber) => {
  return apiClient.get(`/screenings/${patientNumber}`);
};
