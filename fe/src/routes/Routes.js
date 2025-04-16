import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Home from '../components/Home';
import Login from '../components/Login';
import RegisterForm from '../components/RegisterForm';
import CreatePost from '../components/CreatePost';
import ManagePosts from '../components/ManagePosts';

const AppRoutes = () => {
  const { isAuthenticated, login } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={login} />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterForm onLogin={login} />} />
      <Route path="/create-post" element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" />} />
      <Route path="/manage-posts" element={isAuthenticated ? <ManagePosts /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
