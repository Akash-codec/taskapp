import { createSlice } from '@reduxjs/toolkit';

const voucherSlice = createSlice({
  name: 'vouchers',
  initialState: { vouchers: [] },
  reducers: {
    addVoucher: (state, action) => {
      state.vouchers.push(action.payload);
    },
    updateVoucher: (state, action) => {
      const index = state.vouchers.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state.vouchers[index] = action.payload;
      }
    },
    deleteVoucher: (state, action) => {
      state.vouchers = state.vouchers.filter((v) => v.id !== action.payload);
    },
  },
});

export const { addVoucher, updateVoucher, deleteVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
