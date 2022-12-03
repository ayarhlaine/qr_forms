import axios from 'axios';

const api = axios.create({
    baseURL: 'https://1fybsr.deta.dev/',
});

export default api;