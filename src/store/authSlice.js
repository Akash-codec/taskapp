import { createSlice } from '@reduxjs/toolkit';

const USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'staff', password: 'staff123', role: 'staff' }
];

const generateMockJWT = (user) => {
  const header = btoa(encodeURIComponent(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const payload = btoa(encodeURIComponent(JSON.stringify({
    username: user.username,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days from now
  })));
  const signature = btoa(encodeURIComponent('mock-signature'));
  return `${header}.${payload}.${signature}`;
};

const verifyMockJWT = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid token format');
      return null;
    }
    const payload = JSON.parse(decodeURIComponent(atob(parts[1])));
    if (payload.exp < Date.now()) {
      console.error('Token expired');
      return null;
    }
    return { username: payload.username, role: payload.role };
  } catch (e) {
    console.error('Token verification error:', e);
    return null;
  }
};

let initialUser = null;
try {
  const token = localStorage.getItem('token');
  if (token) {
    initialUser = verifyMockJWT(token);
    if (!initialUser) {
      localStorage.removeItem('token');
    }
  }
} catch (error) {
  console.error("localStorage access failed:", error);
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: initialUser,
    error: null 
  },
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = USERS.find(u => u.username === username && u.password === password);
      if (user) {
        state.user = { username: user.username, role: user.role };
        state.error = null;
        const token = generateMockJWT(user);
        localStorage.setItem('token', token);
      } else {
        state.error = 'Invalid credentials';
      }
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
