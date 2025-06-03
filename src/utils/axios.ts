// utils/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // sends cookies automatically
});

// Interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/token/refresh');
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
