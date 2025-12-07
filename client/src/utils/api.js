import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data)
};

export const resourceAPI = {
  getAll: () => API.get('/resources'),
  getById: (id) => API.get(`/resources/${id}`),
  search: (query) => API.get(`/resources/search?query=${query}`),
  filter: (type, status) => API.get(`/resources/filter?type=${type}&status=${status}`),
  sort: (by) => API.get(`/resources/sort?by=${by}`),
  book: (data, token) => API.post('/resources/book', data, getConfig(token)),
  cancel: (id, token) => API.put(`/resources/${id}/cancel`, {}, getConfig(token)),
  update: (id, data, token) => API.put(`/resources/${id}/update`, data, getConfig(token)),
  delete: (id, token) => API.delete(`/resources/${id}`, getConfig(token)),
  getResourceBookings: (id, token) => API.get(`/resources/${id}/bookings`, getConfig(token)),
  deleteBooking: (id, token) => API.delete(`/resources/${id}/booking`, getConfig(token))
};

export const userAPI = {
  getBookings: (id, token) => API.get(`/users/${id}/bookings`, getConfig(token))
};

export const analyticsAPI = {
  getUsage: (token) => API.get('/analytics/usage', getConfig(token)),
  getTopRooms: (token) => API.get('/analytics/top-rooms', getConfig(token))
};

export default API;
