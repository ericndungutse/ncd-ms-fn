const getErrorMessage = (error) => {
  return error?.response?.data?.message || 'An unknown error occurred';
};

export default getErrorMessage;
