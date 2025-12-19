import apiClient from './apiClient';

export const loginApi = (credentials) => {
  return apiClient.post('/auth/login', {
    identifier: credentials.email,
    password: credentials.password,
  });
};
