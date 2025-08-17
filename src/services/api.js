import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_SERVER,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

api.getWithQuery = async (path, query = {}) => {
    return await api.get(path, { params: query });
};

export default api;