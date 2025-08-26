import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { getTasks as apiGetTasks, createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from '../api/taskApi';

interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
}

interface TaskContextType {
    tasks: Task[];
    fetchTasks: () => void;
    addTask: (title: string, priority: 'Low' | 'Medium' | 'High') => void;
    updateTask: (id: number, title: string, completed: boolean, priority: 'Low' | 'Medium' | 'High') => void;
    deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        const res = await apiGetTasks();
        setTasks(res.data);
    };

    const addTask = async (title: string, priority: 'Low' | 'Medium' | 'High') => {
        const res = await apiCreateTask(title, priority);
        setTasks(prev => [...prev, res.data]);
    };

    const updateTask = async (id: number, title: string, completed: boolean, priority: 'Low' | 'Medium' | 'High') => {
        const res = await apiUpdateTask(id, title, completed, priority);
        setTasks(prev => prev.map(t => (t.id === id ? res.data : t)));
    };

    const deleteTask = async (id: number) => {
        await apiDeleteTask(id);
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTasks must be used within TaskProvider');
    return context;
};
