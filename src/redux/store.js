import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

export default configureStore({
  reducer: {
    userStore: userSlice,
  },
  // middleware: (getDefaultMiddleware) => [
  //   ...getDefaultMiddleware().concat(authApi.middleware),
  // ],
});
