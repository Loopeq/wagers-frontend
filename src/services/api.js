import axios from 'axios';

const root = process.env.VUE_APP_SERVER;
const baseURL = process.env.DEV ? 'https://' + root : 'http://' + root;

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

api.getWithQuery = async (path, query = {}) => {
    return await api.get(path, { params: query });
};

export default api;