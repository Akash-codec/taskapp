import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteVoucher } from '../store/voucherSlice';

const Vouchers = () => {
  const vouchers = useSelector((state) => state.vouchers.vouchers);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Delete voucher?')) {
      dispatch(deleteVoucher(id));
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-300 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Vouchers</h2>
        <Link to="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-colors">
          Create New
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">Date</th>
              <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">Voucher No</th>
              <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">Type</th>
              <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">Account</th>
              <th className="border border-gray-300 p-3 text-right font-semibold text-gray-700">Amount</th>
              <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">Narration</th>
              {user?.role === 'admin' && <th className="border border-gray-300 p-3 text-center font-semibold text-gray-700">Action</th>}
            </tr>
          </thead>
          <tbody>
            {vouchers.length === 0 ? (
              <tr>
                <td colSpan={user?.role === 'admin' ? 7 : 6} className="text-center p-6 border border-gray-300 text-gray-500">
                  No vouchers found. Create one to get started.
                </td>
              </tr>
            ) : (
              vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-300 p-3 text-gray-800">{v.date}</td>
                  <td className="border border-gray-300 p-3 text-gray-800">{v.voucherNo}</td>
                  <td className="border border-gray-300 p-3 text-gray-800">{v.type}</td>
                  <td className="border border-gray-300 p-3 text-gray-800">{v.account}</td>
                  <td className="border border-gray-300 p-3 text-right text-gray-800 font-medium">₹{v.amount}</td>
                  <td className="border border-gray-300 p-3 text-gray-800">{v.narration}</td>
                  {user?.role === 'admin' && (
                    <td className="border border-gray-300 p-3 text-center">
                      <div className="flex gap-3 justify-center">
                        <Link to={`/edit/${v.id}`} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                        <button onClick={() => handleDelete(v.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vouchers;
