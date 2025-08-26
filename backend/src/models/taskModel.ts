import { pool } from '../utils/db';

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
    user_id: number;
}

// Fetch all tasks for a specific user
export const getAllTasks = async (userId: number): Promise<Task[]> => {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id=$1 ORDER BY id ASC', [userId]);
    return result.rows;
};

export const createTask = async (title: string, priority: 'Low' | 'Medium' | 'High', userId: number): Promise<Task> => {
    const result = await pool.query(
        'INSERT INTO tasks (title, completed, priority, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, false, priority, userId]
    );
    return result.rows[0];
};

export const updateTask = async (
    id: number,
    title: string,
    completed: boolean,
    priority: 'Low' | 'Medium' | 'High',
    userId: number
): Promise<Task | null> => {
    const result = await pool.query(
        'UPDATE tasks SET title=$1, completed=$2, priority=$3 WHERE id=$4 AND user_id=$5 RETURNING *',
        [title, completed, priority, id, userId]
    );
    return result.rows[0] || null;
};

export const deleteTask = async (id: number, userId: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM tasks WHERE id=$1 AND user_id=$2', [id, userId]);
    return (result.rowCount ?? 0) > 0;
};

export const getTaskById = async (id: number, userId: number): Promise<Task | null> => {
    const result = await pool.query('SELECT * FROM tasks WHERE id=$1 AND user_id=$2', [id, userId]);
    return result.rows[0] || null;
};

