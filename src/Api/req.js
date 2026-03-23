import axios from 'axios';

export const createRequest = (data) => {
  return axios.post('/api/requests', data);
};

export const validateRequest = (data) => {
  return axios.post('/api/requests/validate', data);
};
