import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const bugService = {
  getAllBugs: () => api.get('/bugs'),
  createBug: (bugData) => api.post('/bugs', bugData),
  updateBug: (id, bugData) => api.put(`/bugs/${id}`, bugData),
  deleteBug: (id) => api.delete(`/bugs/${id}`),
};