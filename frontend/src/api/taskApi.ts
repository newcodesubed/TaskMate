import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/tasks',
    withCredentials: true,
});

export const getTasks = () => api.get('/');
export const createTask = (title: string, priority: string) => api.post('/', { title, priority });
export const updateTask = (id: number, title: string, completed: boolean, priority: string) =>
    api.put(`/${id}`, { title, completed, priority });
export const deleteTask = (id: number) => api.delete(`/${id}`);
