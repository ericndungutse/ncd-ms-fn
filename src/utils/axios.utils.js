export const getErrorMessage = (error) => {
  console.error('API Error:', error);
  return error?.response?.data?.message || 'An unknown error occurred';
};

export const getResponseData = (response) => {
  return response?.data;
};
