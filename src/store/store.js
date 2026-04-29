import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import voucherReducer from './voucherSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vouchers: voucherReducer,
  },
});
