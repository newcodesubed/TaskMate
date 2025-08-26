import { pool } from '../utils/db';

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
}

export const getAllTasks = async (): Promise<Task[]> => {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    return result.rows;
};

export const getTaskById = async (id: number): Promise<Task | null> => {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const createTask = async (title: string, priority: 'Low' | 'Medium' | 'High'): Promise<Task> => {
    const result = await pool.query(
        'INSERT INTO tasks (title, completed, priority) VALUES ($1, $2, $3) RETURNING *',
        [title, false, priority]
    );
    return result.rows[0];
};

export const updateTask = async (
    id: number,
    title: string,
    completed: boolean,
    priority: 'Low' | 'Medium' | 'High'
): Promise<Task | null> => {
    const result = await pool.query(
        'UPDATE tasks SET title=$1, completed=$2, priority=$3 WHERE id=$4 RETURNING *',
        [title, completed, priority, id]
    );
    return result.rows[0] || null;
};

export const deleteTask = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM tasks WHERE id=$1', [id]);
    return (result.rowCount ?? 0) > 0;
};
