import axios from 'axios';

export const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const client = axios.create({
  baseURL: BASE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});
