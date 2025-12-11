export const getErrorMessage = (error) => {
  return error?.response?.data?.message || 'An unknown error occurred';
};

export const getResponseData = (response) => {
  return response?.data;
};
