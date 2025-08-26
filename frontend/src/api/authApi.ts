import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    withCredentials: true,
});

export const signup = (username: string, password: string) =>
    api.post('/signup', { username, password });

export const login = (username: string, password: string) =>
    api.post('/login', { username, password });

export const logout = () => api.post('/logout');
