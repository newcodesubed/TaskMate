import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authApi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-fit bg-gray-00 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <form onSubmit={handleSubmit} className="bg-gray-00 p-8 rounded shadow-xl w-96 bg-opacity-70 backdrop-filter backdrop-blur-xl overflow-hidden">
        <div className='flex 
        justify-center '>

          <img
            src="logo.webp"
            className="mx-2 size-15 mb-2"
            width={50}
            height={33}
            alt="Logo"
            loading="lazy" 
            />
            </div>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded mb-4 text-amber-50"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded mb-4 text-amber-50"
        />
        <button type="submit" className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
>
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{"   "} <Link className='text-green-400 hover:underline' to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
