import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      dispatch(login({ username, role: 'admin' }));
    } else if (username === 'staff' && password === 'staff123') {
      dispatch(login({ username, role: 'staff' }));
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="p-8 border-2 border-gray-600 bg-white shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 mt-2 font-medium transition-colors">
            Sign In
          </button>
        </form>
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 text-sm text-blue-800 rounded">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <ul className="list-disc pl-5">
            <li><strong>Admin:</strong> admin / admin123</li>
            <li><strong>Staff:</strong> staff / staff123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
