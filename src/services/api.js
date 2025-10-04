import axios from 'axios';
const protocol = window.location.protocol === "https:" ? "https" : "http";
const api = axios.create({
  baseURL: `${protocol}://${import.meta.env.VITE_SERVER}`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.getWithQuery = async (path, query = {}) => {
    return await api.get(path, { params: query });
};

export default api;