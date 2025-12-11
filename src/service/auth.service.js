import apiClient from './apiClient';

export const loginApi = (credentials) => {
  return apiClient.post('/auth/login', {
    identifier: credentials.email,
    password: credentials.password,
  });
};

// export const getMe = async () => {
//   try {
//     let token = null;
//     try {
//       token = localStorage.getItem('token');
//     } catch (e) {
//       console.log(e);

//       // localStorage unavailable
//     }

//     if (!token) throw new Error('No token');

//     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/accounts/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const d = response.data;
//     const user = d?.data?.user || d?.user || d?.data || d;

//     return { user, token };
//   } catch (error) {
//     // normalize error
//     const message = error?.response?.data?.detail || error?.message || 'Failed to fetch user';
//     throw new Error(message);
//   }
// };

// export const logoutApi = async () => {
//   try {
//     let token = null;
//     try {
//       token = localStorage.getItem('token');
//     } catch (e) {
//       console.log(e);

//       // localStorage unavailable
//     }

//     if (!token) throw new Error('No token');

//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/accounts/logout`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     const message = error?.response?.data?.detail || error?.message || 'Logout failed';
//     throw new Error(message);
//   }
// };
