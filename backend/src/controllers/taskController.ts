import { Request, Response } from 'express';
import * as taskModel from '../models/taskModel';
import { AuthRequest } from '../middleware/authMiddleware';

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const tasks = await taskModel.getAllTasks();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getTask = async (req: AuthRequest, res: Response) => {
    try {
        const id = Number(req.params.id);
        const task = await taskModel.getTaskById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createNewTask = async (req: AuthRequest, res: Response) => {
    try {
        const { title, priority } = req.body;
        const task = await taskModel.createTask(title, priority);
        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateExistingTask = async (req: AuthRequest, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { title, completed, priority } = req.body;
        const task = await taskModel.updateTask(id, title, completed, priority);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteExistingTask = async (req: AuthRequest, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await taskModel.deleteTask(id);
        if (!deleted) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
