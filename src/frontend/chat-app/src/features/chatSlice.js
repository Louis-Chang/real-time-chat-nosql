import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentFriend: null,
  },
  reducers: {
    setCurrentFriend: (state, action) => {
      state.currentFriend = action.payload;
    },
    clearCurrentFriend: (state) => {
      state.currentFriend = null;
    },
  },
});

export const { setCurrentFriend, clearCurrentFriend } = chatSlice.actions;

export default chatSlice.reducer;
