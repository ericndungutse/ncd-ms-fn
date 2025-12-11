import apiClient from './apiClient';

export const getCampaigns = () => {
  return apiClient.get('/screening-campaigns');
};
