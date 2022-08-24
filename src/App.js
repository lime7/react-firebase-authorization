import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { MainRoutes, LoginRoutes } from './routes';
import './style.css';

export default function App() {
  const {
    userStore: { isLogin },
  } = useSelector((state) => ({ userStore: state.userStore }));

  const isAuthenticated = Boolean(isLogin);
  return (
    <div className="container py-4">
      <BrowserRouter>
        {isAuthenticated && <MainRoutes />}

        {!isAuthenticated && <LoginRoutes />}
      </BrowserRouter>
    </div>
  );
}
