import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import Login from './pages/Login';
import Vouchers from './pages/Vouchers';
import VoucherForm from './pages/VoucherForm';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        
        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Vouchers />} />
          <Route path="create" element={<VoucherForm />} />
          <Route path="edit/:id" element={user?.role === 'admin' ? <VoucherForm isEdit /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;