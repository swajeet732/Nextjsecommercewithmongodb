import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, email } = action.payload;
      state.token = token;
      state.email = email;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.email = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
