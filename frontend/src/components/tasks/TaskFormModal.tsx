import React, { useState, useEffect } from 'react';
import type { Task } from '../../context/TaskContext';

interface Props {
  task?: Task;
  onClose: () => void;
  onSave: (title: string, priority: 'Low' | 'Medium' | 'High') => void;
}

const TaskFormModal: React.FC<Props> = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(task?.priority || 'Low');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title, priority);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-200 to-gray-250  p-6 rounded w-96 flex flex-col gap-4 shadow-xl"
      >
        <h3 className="text-xl font-bold">{task ? 'Edit Task' : 'New Task'}</h3>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskFormModal;
