import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Registration from './views/Registration';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
