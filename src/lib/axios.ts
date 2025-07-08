import axios from 'axios';

// Define the base URL from environment or default to localhost
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized - clear token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Let the auth context handle the redirect
      }
    }
    return Promise.reject(error);
  }
);

export default instance;