import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/tasks/TaskItem';
import TaskFormModal from '../components/tasks/TaskFormModal';
import { logout as apiLogout } from '../api/authApi';

const Dashboard = () => {
  const { tasks,setTasks, fetchTasks, addTask, updateTask, deleteTask } = useTasks();
  const [modalTask, setModalTask] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task: any) => {
    setModalTask(task);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    deleteTask(id);
  };

  const handleToggle = (task: any) => {
    updateTask(task.id, task.title, !task.completed, task.priority);
  };

  const handleSave = (title: string, priority: 'Low' | 'Medium' | 'High') => {
    if (modalTask) {
      updateTask(modalTask.id, title, modalTask.completed, priority);
      setModalTask(null);
    } else {
      addTask(title, priority);
    }
  };

  const handleLogout = async () => {
    await apiLogout();
    setTasks([]);
    navigate('/login');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-3xl font-bold">My Todo List</h1> */}
        <div className='flex items-center'>

        <img
            src="../../public/logo.webp"
            className="mx-2"
            width={50}
            height={33}
            alt="Logo"
            loading="lazy" 
            />

            <h1>Hello, What you have for today!</h1>
            </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>

      <button
        onClick={() => { setModalTask(null); setShowModal(true); }}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add New Task
      </button>

      <div>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {showModal && (
        <TaskFormModal
          task={modalTask}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Dashboard;
