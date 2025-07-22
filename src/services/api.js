import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_SERVER,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

/**
 * Универсальный GET-запрос с query-параметрами
 * @param {string} path - путь, например: "/related"
 * @param {Object} query - объект с query-параметрами, например: { sport_id: 33 }
 */
api.getWithQuery = async (path, query = {}) => {
    return await api.get(path, { params: query });
  };
  

export default api;