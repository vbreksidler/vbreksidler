import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use(async (config) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  if (user.token) { config.headers.Authorization = user.token; }
  return config;
});

export default api;
