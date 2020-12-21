import axios from 'axios';

export const basicJsonHeader = { 'Content-Type': 'application/json' };

export const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const client = axios.create({
  baseURL: BASE_API_URL,
  headers: basicJsonHeader
});
