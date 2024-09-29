import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    restoreUser: (state) => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        state.currentUser = JSON.parse(storedUser);
      }
    },
  },
});

export const { setUser, clearUser, restoreUser } = userSlice.actions;

export default userSlice.reducer;
