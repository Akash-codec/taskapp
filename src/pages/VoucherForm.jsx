import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addVoucher, updateVoucher } from '../store/voucherSlice';

const VoucherForm = ({ isEdit }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingVoucher = useSelector((state) => 
    state.vouchers.vouchers.find((v) => v.id === id)
  );

  const [formData, setFormData] = useState({
    date: '',
    voucherNo: '',
    type: 'Journal',
    account: '',
    amount: '',
    narration: ''
  });

  useEffect(() => {
    if (isEdit && existingVoucher) {
      setFormData(existingVoucher);
    }
  }, [isEdit, existingVoucher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateVoucher(formData));
    } else {
      dispatch(addVoucher({ ...formData, id: Date.now().toString() }));
    }
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-8 border border-gray-300 shadow-sm max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">{isEdit ? 'Edit Voucher' : 'Create Voucher'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Voucher No</label>
            <input 
              type="text" 
              name="voucherNo" 
              value={formData.voucherNo} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="Journal">Journal</option>
              <option value="Payment">Payment</option>
              <option value="Receipt">Receipt</option>
              <option value="Contra">Contra</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Account</label>
            <input 
              type="text" 
              name="account" 
              value={formData.account} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
            <input 
              type="number" 
              name="amount" 
              value={formData.amount} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" 
              required 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Narration</label>
          <textarea 
            name="narration" 
            value={formData.narration} 
            onChange={handleChange} 
            className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" 
            rows="3"
            required
          />
        </div>
        <div className="flex gap-3 mt-2">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 font-medium transition-colors">
            {isEdit ? 'Update' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate('/')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 font-medium transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default VoucherForm;
