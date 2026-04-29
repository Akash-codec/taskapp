import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-300 p-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Voucher System</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">{user?.username} <span className="bg-gray-200 text-xs px-2 py-1 rounded text-gray-700 ml-1">{user?.role}</span></span>
          <button onClick={() => dispatch(logout())} className="text-red-600 hover:text-red-800 text-sm font-medium">
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 p-6 w-full max-w-6xl mx-auto">
        <div className="mb-6 flex gap-4">
          <Link to="/" className="text-blue-600 hover:underline font-medium">Voucher List</Link>
          <Link to="/create" className="text-blue-600 hover:underline font-medium">Create Voucher</Link>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
