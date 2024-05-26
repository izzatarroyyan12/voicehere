import axios from 'axios';

const BASE_URL = process.env.API_ENDPOINT_URL || 'http://localhost:6001';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
