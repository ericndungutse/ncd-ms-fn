import apiClient from './apiClient';

export const getCampaigns = () => {
  return apiClient.get('/screening-campaigns');
};

export const createCampaign = (campaignData) => {
  return apiClient().post('/screening-campaigns', campaignData);
};
