import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  usersList: [],
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, setUser } = actions;

export default reducer;
