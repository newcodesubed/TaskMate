import React from 'react';
import type { Task } from '../../context/TaskContext';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggle: (task: Task) => void;
}

const TaskItem: React.FC<Props> = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded shadow mb-2">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          className="w-5 h-5"
        />
        <div>
          <p className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
          <span className="text-sm text-gray-500">{task.priority}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="px-2 py-1 bg-yellow-400 text-white rounded"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
