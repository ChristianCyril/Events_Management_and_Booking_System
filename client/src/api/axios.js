import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

// for public routes
export const api = axios.create(
  {
    baseURL: BASE_URL,
    withCredentials: true
  }
);

export const apiPrivate = axios.create(
  {
    baseURL: BASE_URL,
    withCredentials: true,
    headers:{
      'Content-Type':'application/json'
    }
  }
)